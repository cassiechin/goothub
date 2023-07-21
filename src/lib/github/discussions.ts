import { App } from 'octokit';
import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { requireEnv } from '../requireEnv';

export interface DiscussionList {
	discussions: Discussion[]
	pageInfo: PageInfo
}

export interface Discussion {
	id: string;
	number: number;
	title: string;
	author: string;
	createdAt: string;
}

export interface PageInfo {
	endCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor: string;
}

export const REACTIONS = [
	'THUMBS_UP',
	'THUMBS_DOWN',
	'LAUGH',
	'HOORAY',
	'CONFUSED',
	'HEART',
	'ROCKET',
	'EYES'
] as const;

export const REACTION_EMOJI: Record<(typeof REACTIONS)[number], string> = {
	THUMBS_UP: '👍',
	THUMBS_DOWN: '👎',
	LAUGH: '😄',
	HOORAY: '🎉',
	CONFUSED: '😕',
	HEART: '❤️',
	ROCKET: '🚀',
	EYES: '👀'
};

export interface ReactionGroup {
	content: (typeof REACTIONS)[number];
	totalCount: number;
}

export interface DiscussionDetails extends Discussion {
	reactionGroups: ReactionGroup[];
	bodyHTML: string;
}

interface QueryVariables {
	[name: string]: unknown;
}

async function queryGraphQl<T>(query: string, parameters: QueryVariables = {}): Promise<T> {
	const GITHUB_APP_ID = requireEnv('GITHUB_APP_ID');
	const GITHUB_CLIENT_ID = requireEnv('GITHUB_CLIENT_ID');
	const GITHUB_CLIENT_SECRET = requireEnv('GITHUB_CLIENT_SECRET');
	const GITHUB_INSTALLATION_ID = Number(requireEnv('GITHUB_INSTALLATION_ID'));
	const GITHUB_REPO_OWNER = requireEnv('GITHUB_REPO_OWNER');
	const GITHUB_REPO_NAME = requireEnv('GITHUB_REPO_NAME');

	const app = new App({
		appId: GITHUB_APP_ID,
		privateKey: requireEnv('GITHUB_PRIVATE_KEY').replace(/\\n/g, '\n'),
		oauth: { clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }
	});
	const octokit = await app.getInstallationOctokit(GITHUB_INSTALLATION_ID);

	return await octokit.graphql(
		query,
		Object.assign(
			{
				repoOwner: GITHUB_REPO_OWNER,
				repoName: GITHUB_REPO_NAME
			},
			parameters
		)
	);
}

export async function getDiscussionList(after?: String, before?: String): Promise<DiscussionList> {
	const PAGE_SIZE = 5;

	let first, last;

	if (after || !before) {
		first = PAGE_SIZE;
		last = null;
	} else {
		first = null;
		last = PAGE_SIZE;
	}

	const body = await queryGraphQl(`
		query discussionList($repoOwner: String!, $repoName: String!, $after: String, $before: String, $first: Int, $last: Int) {
			repository(owner: $repoOwner, name: $repoName) {
				discussions(first: $first, last: $last, after: $after, before: $before) {
					edges {
						node {
							number
							title
							author {
								login
							}
							createdAt
						}
					}
					pageInfo {
						endCursor
						hasNextPage
						hasPreviousPage
						startCursor
					}
				}
			}
		}
	`,
		{ after, before, first, last }
	);

	const discussions = (body as any).repository.discussions.edges.map((edge: any) => ({
		number: edge.node.number,
		title: edge.node.title,
		author: edge.node.author.login,
		createdAt: edge.node.createdAt
	}));

	const pageInfo = (body as any).repository.discussions.pageInfo;

	return { discussions, pageInfo };
}

export async function getDiscussionDetails(number: number): Promise<DiscussionDetails> {
	const body = await queryGraphQl(
		`
		query discussionDetails($repoOwner: String!, $repoName: String!, $number: Int!) {
			repository(owner: $repoOwner, name: $repoName) {
				discussion(number: $number) {
					id
					number
					title
					author {
					  login
					}
					createdAt
					reactionGroups {
					  content
					  reactors {
						totalCount
					  }
					}
					bodyHTML
				}
			}
		}
	`,
		{ number }
	);

	const discussion = (body as any).repository.discussion;
	return {
		id: discussion.id,
		number: discussion.number,
		title: discussion.title,
		author: discussion.author.login,
		createdAt: discussion.createdAt,
		reactionGroups: discussion.reactionGroups.map((group: any) => ({
			content: group.content,
			totalCount: group.reactors.totalCount
		})),
		bodyHTML: discussion.bodyHTML
	};
}

export interface DiscussionComment {
	id: string;
	author: string;
	createdAt: string;
	bodyHTML: string;
}

export async function getDiscussionComments(number: number): Promise<DiscussionComment[]> {
	const body = await queryGraphQl(
		`
		query discussionComments($repoOwner: String!, $repoName: String!, $number: Int!) {
			repository(owner: $repoOwner, name: $repoName) {
				discussion(number: $number) {
					comments(last: 10) {
						edges {
							node {
								id
								author {
									login
								}
								createdAt
								bodyHTML
							}
						}
					}
				}
			}
		}
	`,
		{ number }
	);

	const comments = (body as any).repository.discussion.comments.edges;
	return comments.map((comment: any) => ({
		id: comment.node.id,
		author: comment.node.author.login,
		createdAt: comment.node.createdAt,
		bodyHTML: comment.node.bodyHTML
	}));
}

// TODO, add clientMutationId
// TODO, add proper response object
export async function addReply(comment: String, discussionId: String, commentId?: String): Promise<Boolean> {
	const body = await queryGraphQl(
		`
		mutation discussionComment($comment: String!, $discussionId: ID!, $commentId: ID) {
			addDiscussionComment(input: {body: $comment, discussionId: $discussionId, replyToId: $commentId}) {
				clientMutationId
			}
		}
	`,
		{ comment, discussionId, commentId }
	);

	return true;
}

export async function addReaction(content: String, subjectId: String) {
	await queryGraphQl(
		`
		mutation addReaction($content: ReactionContent!, $subjectId: ID!) {
			addReaction(input: {content: $content, subjectId: $subjectId}) {
				clientMutationId
			}
		}
		`,
		{content, subjectId}
	);

	return true;
}