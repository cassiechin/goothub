import { For, createMemo } from 'solid-js';
import { RouteDataArgs, Title, refetchRouteData, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { AddReaction } from '~/components/AddReaction';
import { AddComment } from '~/components/AddComment';
import { Replies } from '~/components/Replies';
import {
	REACTION_EMOJI,
	getDiscussionComments,
	getDiscussionDetails
} from '~/lib/github/discussions';
import { comment } from 'postcss';
import './index.css';

export function routeData({ params }: RouteDataArgs) {
	return createServerData$(
		async (id) => {
			const discussionId = Number(id);
			const data = await Promise.all([
				getDiscussionDetails(discussionId),
				getDiscussionComments(discussionId)
			]);
			return { discussion: data[0], comments: data[1] };
		},
		{ key: () => params.id }
	);
}

export default function Discussions() {
	const discussionAndComments = useRouteData<typeof routeData>();
	const reactions = createMemo(
		() => discussionAndComments()?.discussion.reactionGroups.filter((group) => group.totalCount > 0)
	);
	const discussion = createMemo(() => discussionAndComments()?.discussion);
	const comments = () => discussionAndComments()?.comments;
	const discussionId = createMemo(() => discussionAndComments()?.discussion.id);

	return (
		<div class="body-container">
			<Title>GootHub - Discussions</Title>
			<section>
				<h1>{discussion()?.title}</h1>
				<p>
					by {discussion()?.author} on {discussion()?.createdAt}
				</p>
				<div innerHTML={discussion()?.bodyHTML} />
				<div class="flex justify-end">
					<For each={reactions()}>
						{(group) => (
							<button disabled>
								{REACTION_EMOJI[group.content]}
								{group.totalCount}
							</button>
						)}
					</For>
					<AddReaction subjectId={discussionId} />
				</div>
				<div>
					<h2>Comments</h2>
					<ul>
						<For each={comments()}>{(comment) => (<li class="my-2">
							<span innerHTML={comment.bodyHTML}></span>
							<Replies discussionId={discussionId} commentId={comment.id} />
						</li>)}
						</For>
					</ul>
					<div class="mt-12">
						<AddComment discussionId={discussionId} onSuccess={refetchRouteData} />
					</div>
				</div>
			</section>
		</div>
	);
}
