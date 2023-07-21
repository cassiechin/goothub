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
                <div>
                    <h2>Title</h2>
                    <input></input>
                </div>
                <div>
                    <h2>Discussion</h2>
                    <textarea></textarea>
                </div>
                <div>
                    <button onClick={() => addDiscussion()}>Submit</button>
                </div>
            </div>
        </div>
    );
}
