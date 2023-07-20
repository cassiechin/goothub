import { For, createSignal } from 'solid-js';
import { REACTIONS, REACTION_EMOJI } from '~/lib/github/discussions';
import './AddDiscussion.css';

export function AddDiscussion() {
	// const [shown, setShown] = createSignal(false);

	function addDiscussion() {
		console.log('react with');
	}

	return (
		<div class="add-discussion">
            <h1>Create a Discussion</h1>
            <div class="discussion-form">
                <div class="discussion-form-item">
                    <label>
                        Title:             
                        <input></input>
                    </label>
                </div>
                <div class="discussion-form-item">
                    <label>
                        Discussion:             
                        <textarea></textarea>
                    </label>
                </div>
                <div class="submit-button">
                    <button onClick={() => addDiscussion()}>Submit</button>
                </div>
            </div>
		</div>
	);
}
