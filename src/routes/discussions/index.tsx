import { For } from 'solid-js';
import { A, Title, useRouteData, useNavigate } from 'solid-start';
import {redirect, createServerData$ } from 'solid-start/server';
import { getDiscussionList } from '~/lib/github/discussions';
import { AddDiscussion } from '~/components/AddDiscussion';
import './index.css';

export function routeData() {
	return createServerData$(() => getDiscussionList());
}

export default function Discussions() {
	const discussions = useRouteData<typeof routeData>();
	const discussionForm = useRouteData<typeof routeData>();
	const navigate = useNavigate();

	function goToPage() {
		console.log('test does this click');
		navigate('../discussionForm');
	}

	const PAGE_SIZE = 5;
	const PAGE_NUM = 1; // TODO: use props
	return (
		<main>
			<Title>Discussions</Title>
			<button onClick={() => goToPage()}>New Discussion</button>
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
