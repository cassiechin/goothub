import { For, createSignal, createRenderEffect, Accessor } from 'solid-js';
import './Replies.css';
import { Reply } from '~/lib/github/discussions';
import { AddReply } from '~/components/AddReply';

export function Replies({ discussionId, commentId } : { discussionId: Accessor<String>, commentId: String}) {
	const [replies, setReplies] = createSignal(null);

	// TODO, move to reusable file so that AddComment can also use
	async function loadReplies(forceLoad: Boolean) {
		if (replies() != null && forceLoad !== true) {
			setReplies(null);
			return;
		}

		const response = await fetch(`/api/comment/${commentId}/replies`, {
			method: 'GET',
		});
		const repliesResponse = await response.json();
		setReplies(repliesResponse);
	}

	function model(el, value) {
		const [field, setField] = value();
		createRenderEffect(() => (el.value = field()));
		el.addEventListener("input", (e) => setField(e.target.value));
	  }

	return (
		<>
			<button class="repliesButton" onClick={loadReplies}>{replies() == null ? '+' : '-'}</button>
			<div class="replies">
				<ul>
					<For each={replies()}>{(reply) => (
						<>
							<div innerHTML={reply.bodyHTML}></div>
						</>
					)}
					</For>
				</ul>
			</div>
			<AddReply discussionId={discussionId} commentId={commentId} onSuccess={() => loadReplies(true)} />
		</>
	);
}
