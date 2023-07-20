import { For, createSignal } from 'solid-js';
import './AddReply.css';
import { createRenderEffect } from "solid-js";

export function AddReply({ discussionId, commentId } : { discussionId: String, commentId: String}) {
	function addReply() {
		fetch('/api/comments', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
			body: JSON.stringify({ comment: reply(), discussionId, commentId }),
		});
	}

	const [reply, setReply] = createSignal("");

	function model(el, value) {
		const [field, setField] = value();
		createRenderEffect(() => (el.value = field()));
		el.addEventListener("input", (e) => setField(e.target.value));
	  }

	return (
		<div class="add-reply">
			{/* TODO add Write a reply text to background? */}
			{/* TODO convert to textarea on click? */}
			{/* TODO, is this the best way to use an input? */}
			<input type="text" use:model={[reply, setReply]} />
			<button onClick={addReply}>Add reply</button>
			{/* <dialog open={shown()}> */}
				{/* <textarea></textarea> */}
			{/* </dialog> */}
		</div>
	);
}
