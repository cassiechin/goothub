import { For } from 'solid-js';
import { A, Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { getDiscussionList } from '~/lib/github/discussions';

export function routeData() {
	return createServerData$(() => getDiscussionList());
}

export default function Discussions() {
	const discussions = useRouteData<typeof routeData>();
	const PAGE_SIZE = 5;
	const PAGE_NUM = 1; // TODO: use props
	return (
		<main>
			<Title>Discussions</Title>
			<h1>Discussions</h1>
			<table style={{"text-align": "left"}}>
				<tbody>
				<tr><th>Title</th><th>Creator</th><th>Created at</th></tr>
				<For each={discussions()}>
					{(d, i) => (
						<tr>
							<td >
							<A href={'/discussions/' + d.number}>{d.title}</A> </td>
							<td>{d.author}</td> <td> 
							{d.createdAt} </td>
						</tr>
					)}
				</For>
			  </tbody>
			</table>
		</main>
	);
}
