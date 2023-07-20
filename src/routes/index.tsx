import { Title, useRouteData } from 'solid-start';
// import { login } from '~/lib/github/discussions';
// import { createServerData$ } from 'solid-start/server';
import { signIn } from "@solid-auth/base/client";

function CallSignIn() {
	signIn("gihub", { redirectTo: "/oauth/callback" });
}


export default function Home() {
	return (
		<main>
			<Title>Home</Title>
			Welcome!
			<button onClick={CallSignIn}>Sign In</button>
		</main>
	);
}
