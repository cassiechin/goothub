import { For, Show } from 'solid-js';
import { A, Title, useRouteData, useNavigate, useSearchParams } from 'solid-start';
import { redirect, createServerData$ } from 'solid-start/server';
import { getDiscussionList } from '~/lib/github/discussions';
import { AddDiscussion } from '~/components/AddDiscussion';
import './index.css';

export function routeData() {
	const [searchParams] = useSearchParams();
	return createServerData$(
		async ([, after, , before]) => getDiscussionList(after, before),
		{ key: () => ["after", searchParams.after, "before", searchParams.before] },
	);
}

export default function Discussions() {
	const discussionList = useRouteData<typeof routeData>();
	const discussionForm = useRouteData<typeof routeData>();
	const navigate = useNavigate();

	function goToPage() {
		console.log('test does this click');
		navigate('../discussionForm');
	}

	return (
		<div class="body-container">
			<Title>Discussions</Title>
			<h1>Discussions</h1>
			<div class="button-container">
				<button class="new-discussion-button" onClick={() => goToPage()}>
					<span class="material-icons">add</span>
					<span>New Discussion</span>
				</button>
			</div>
			<table class="table-auto">
				<tbody>
					<tr><th>Title</th><th>Creator</th><th>Created at</th></tr>
					<For each={discussionList()?.discussions}>
						{(d, i) => (
							<tr>
								<td><A href={`/discussions/${d.number}`}>{d.title}</A></td>
								<td>{d.author}</td>
								<td>{d.createdAt}</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
			<div class="nav-button-container">
				<Show when={discussionList()?.pageInfo?.hasPreviousPage}>
					<button class="prev-button">
						<A href={`?before=${discussionList()?.pageInfo?.startCursor}`}>Prev Page</A>
					</button>
				</Show>
				<Show when={discussionList()?.pageInfo?.hasNextPage}>
					<button class="next-button">
						<A href={`?after=${discussionList()?.pageInfo?.endCursor}`}>Next Page</A>
					</button>
				</Show>
			</div>
		</div>
	);
}
