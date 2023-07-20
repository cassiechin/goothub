import {A} from 'solid-start';
import { createSession } from "@solid-auth/base/client";
import { signIn, signOut } from "@solid-auth/base/client";
import {Show} from 'solid-js';

function CallSignIn() {
	signIn("github", { redirectTo: "/" });
}

function CallSignOut() {
	signOut({ redirectTo: "/"});
}

export function TopNav() {
    const session = createSession();
    const user = () => session()?.user;
    return (<>
       <A href="/">Home</A>
       <A href="/discussions">Discussions</A>
       <A href="/about">About</A>

       <Show
            when={session()}
            fallback={
            <button style={{"float": "right"}} onClick={CallSignIn}>
				Sign in
            </button>
            }
        >
            <button style={{"float": "right"}} onClick={CallSignOut}>Sign Out</button>
			<span style={{"float": "right", "padding-right": "8px"}}>{session()?.user?.name}</span>
            <img src={session()?.user.image} style={{"width": "20px", "height": "20px", "float":"right", "padding-right": "8px"}}></img>
		</Show>

    </>);
}