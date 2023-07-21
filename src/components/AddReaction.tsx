import { For, createSignal, Accessor } from 'solid-js';
import { ReactionGroup, REACTIONS, REACTION_EMOJI } from '~/lib/github/discussions';
import './AddReaction.css';

export function AddReaction({subjectId, reactions}: {subjectId: Accessor<String>, reactions:Accessor<ReactionGroup[]>}) {
	const [shown, setShown] = createSignal(false);

	async function addReaction(reaction: (typeof REACTIONS)[number]) {
		setShown(false);
		let inserted = false;
		reactions().forEach((reactionGroup) => {
			if (reactionGroup.content == reaction) {
				reactionGroup.totalCount +=1;
				inserted = true;
			}
		})
		if (!inserted) {
			reactions().push({content: reaction, totalCount: 1});
		}
		await fetch('/api/reaction', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
			body: JSON.stringify({content:reaction, subjectId: subjectId()}),
		});
	}

	return (
		<div class="add-reaction">
			<button onClick={() => setShown((s) => !s)}>Add reaction</button>
			<dialog open={shown()}>
				<button class="close-icon flex justify-center m-0 p-1" onClick={() => setShown(false)}><span class="material-icons">close</span></button>				
				<For each={REACTIONS}>{(reaction) => <button onClick={() => addReaction(reaction)}>{REACTION_EMOJI[reaction]}</button>}</For>
			</dialog>
		</div>
	);
}
