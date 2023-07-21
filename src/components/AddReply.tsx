import { For, createSignal, createRenderEffect, Accessor } from 'solid-js';

export function AddReply({ discussionId, commentId } : { discussionId: Accessor<String>, commentId: String}) {
	// TODO, move to reusable file so that AddComment can also use
	async function addReply() {
		await fetch('/api/comments', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
			body: JSON.stringify({ comment: reply(), discussionId: discussionId(), commentId }),
		});
		setReply("");
	}

	const [reply, setReply] = createSignal("");

	function model(el, value) {
		const [field, setField] = value();
		createRenderEffect(() => (el.value = field()));
		el.addEventListener("input", (e) => setField(e.target.value));
	  }

	return (
		<div class="flex justify-between w-full">
			{/* TODO convert to textarea on click? */}
			{/* TODO, is this the best way to use an input? */}
			<input class="w-4/5 rounded-lg h-10" type="text" placeholder="Write a reply" use:model={[reply, setReply]} />
			<button onClick={addReply}>Reply</button>
		</div>
	);
}
