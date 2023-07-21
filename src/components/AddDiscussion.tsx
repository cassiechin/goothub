import { createSignal, createRenderEffect } from 'solid-js';
import './AddDiscussion.css';

export function AddDiscussion({}) {
	// const [shown, setShown] = createSignal(false);

	function addDiscussion() {
        console.log(title());
        console.log(discussion());

        fetch('/api/discussion', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
            body: JSON.stringify({discussionBody: discussion(), title: title()})
        });
	}

    const [discussion, body] = createSignal("");
    const [title, titlebody] = createSignal("");

    function model(el, value) {
		const [field, setField] = value();
		createRenderEffect(() => (el.value = field()));
        el.addEventListener("input", (e) => setField(e.target.value));
	  }

	return (
		<div class="add-discussion">
            <h1>Create a Discussion</h1>
            <div class="discussion-form">
                <div class="discussion-form-item">
                    <label>
                        Title:             
                        <input use:model={[title, titlebody]}></input>
                    </label>
                </div>
                <div class="discussion-form-item">
                    <label>
                        Discussion:             
                        <textarea use:model={[discussion, body]}></textarea>
                    </label>
                </div>
                <div class="submit-button">
                    <button onClick={() => addDiscussion()}>Submit</button>
                </div>
            </div>
		</div>
	);
}
