import { For, createSignal, createRenderEffect } from 'solid-js';
import './AddComment.css';

export function AddComment({ discussionId, onSuccess } : { discussionId: String, onSuccess: Function}) {
	// TODO, move to reusable file so that AddReply can also use
	async function addComment() {
		await fetch('/api/comments', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
			body: JSON.stringify({ comment: comment(), discussionId }),
		});
		onSuccess && onSuccess();
		setComment("");
	}

	const [comment, setComment] = createSignal("");

	function model(el, value) {
		const [field, setField] = value();
		createRenderEffect(() => (el.value = field()));
		el.addEventListener("input", (e) => setField(e.target.value));
	  }

	return (
		<div class="add-comment">
			{/* TODO convert to textarea on click? */}
			{/* TODO, is this the best way to use an input? */}
			<input type="text" placeholder="Write a comment" use:model={[comment, setComment]} />
			<button onClick={addComment}>Comment</button>
		</div>
	);
}
