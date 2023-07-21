import { For, Show } from 'solid-js';
import { A, Title, useRouteData, useNavigate, useSearchParams } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { getDiscussionList } from '~/lib/github/discussions';

export function routeData() {
	const [searchParams] = useSearchParams();
	return createServerData$(
		async ([, after, , before]) => getDiscussionList(after, before),
		{ key: () => ["after", searchParams.after, "before", searchParams.before] },
	);
}

export default function Discussions() {
	const discussionList = useRouteData<typeof routeData>();
	const navigate = useNavigate();

	function goToPage() {
		navigate('../discussionForm');
	}

	return (
		<div class="body-container">
			<Title>Discussions</Title>
			<h1>Discussions</h1>
			<div class="button-container">
				<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => goToPage()}>
					<span class="material-icons mr-1">add</span>
					<span>New Discussion</span>
				</button>
			</div>
			<table class="table-auto min-w-full text-left text-sm font-normal">
				<tbody>
					<tr>
						<For each={["Title", "Creator", "Created at"]}>
							{(heading) => <td class="whitespace-nowrap px-6 py-4 font-semibold text-lg">{heading}</td>}
						</For>
					</tr>
					<For each={discussionList()?.discussions}>
						{(d, i) => (
							<tr class="border-b">
								<td class="whitespace-nowrap px-6 py-4 hover:underline"><A href={`/discussions/${d.number}`}>{d.title}</A></td>
								<td class="whitespace-nowrap px-6 py-4">{d.author}</td>
								<td class="whitespace-nowrap px-6 py-4">{d.createdAt}</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
			<div class="flex justify-between">
				<Show when={discussionList()?.pageInfo?.hasPreviousPage}>
					<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
						<A href={`?before=${discussionList()?.pageInfo?.startCursor}`}>Prev Page</A>
					</button>
				</Show>
				<Show when={discussionList()?.pageInfo?.hasNextPage}>
					<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
						<A href={`?after=${discussionList()?.pageInfo?.endCursor}`}>Next Page</A>
					</button>
				</Show>
			</div>
		</div>
	);
}
