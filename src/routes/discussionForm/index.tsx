import { For } from 'solid-js';
import { A, Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { getDiscussionList } from '~/lib/github/discussions';
import { AddDiscussion } from '~/components/AddDiscussion';

export function routeData() {
	return createServerData$(() => getDiscussionList());
}

export default function AddDiscussionPage() {
	const addDiscussionPage = useRouteData<typeof routeData>();
	return (
		<main>
            <AddDiscussion />
		</main>
	);
}
