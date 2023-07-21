import { For, createMemo } from 'solid-js';
import { RouteDataArgs, Title, refetchRouteData, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { AddReaction } from '~/components/AddReaction';
import { AddReply } from '~/components/AddReply';
import { AddComment } from '~/components/AddComment';
import {
	REACTION_EMOJI,
	getDiscussionComments,
	getDiscussionDetails
} from '~/lib/github/discussions';

export function routeData({ params }: RouteDataArgs) {
	return createServerData$(
		(id) => {
			const discussionId = Number(id);
			return Promise.all([
				getDiscussionDetails(discussionId),
				getDiscussionComments(discussionId)
			]).then((data) => {
				return { discussion: data[0], comments: data[1] };
			});
		},
		{ key: () => params.id }
	);
}

export default function Discussions() {
	const discussionAndComments = useRouteData<typeof routeData>();
	const reactions = createMemo(
		() => discussionAndComments()?.discussion.reactionGroups.filter((group) => group.totalCount > 0)
	);
	const discussion = () => discussionAndComments()?.discussion;
	const comments = () => discussionAndComments()?.comments;

	return (
		<div class="body-container">
			<Title>GootHub - Discussions</Title>
			<section>
				<h1>{discussion()?.title}</h1>
				<p>
					by {discussion()?.author} on {discussion()?.createdAt}
				</p>
				<div innerHTML={discussion()?.bodyHTML} />
				<div class="reactions">
					<For each={reactions()}>
						{(group) => (
							<button disabled>
								{REACTION_EMOJI[group.content]}
								{group.totalCount}
							</button>
						)}
					</For>
					<AddReaction />
				</div>
				<div class="comments">
					<h2>Comments</h2>
					<ul>
						<For each={comments()}>{(comment) => (
							<li class="comment-list-item">
								<div innerHTML={comment.bodyHTML}></div>
								<AddReply discussionId={discussion()?.id} commentId={comment.id} />
							</li>
						)}
						</For>
					</ul>
					<div class="add-comment-container">
						<AddComment discussionId={discussion()?.id} onSuccess={refetchRouteData}/>
					</div>
				</div>
			</section>
		</div>
	);
}
