import { For, createSignal, createRenderEffect, Accessor } from 'solid-js';

export function AddComment({ discussionId, onSuccess } : { discussionId: Accessor<String>, onSuccess: Function}) {
	// TODO, move to reusable file so that AddReply can also use
	async function addComment() {
		await fetch('/api/comments', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
			body: JSON.stringify({ comment: comment(), discussionId: discussionId() }),
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
		<div>
			{/* TODO convert to textarea on click? */}
			{/* TODO, is this the best way to use an input? */}
			<div>
				<input class="w-4/5 rounded-lg h-10" type="text" placeholder="Write a comment" use:model={[comment, setComment]} />
			</div>
			<div class="mt-4">
				<button onClick={addComment}>Comment</button>
			</div>
		</div>
	);
}
