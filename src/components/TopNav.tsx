import { A } from 'solid-start';
import { createSession } from "@solid-auth/base/client";
import { signIn, signOut } from "@solid-auth/base/client";
import { Show } from 'solid-js';
import './TopNav.css';

function CallSignIn() {
    signIn("github", { redirectTo: "/" });
}

function CallSignOut() {
    signOut({ redirectTo: "/" });
}

export function TopNav() {
    const session = createSession();
    const user = () => session()?.user;
    return (<div class="top-nav">
        <div class="left-nav">
            <A href="/">Home</A>
            <A href="/discussions">Discussions</A>
            <A href="/about">About</A>
        </div>
        <div class="right-nav">
            <Show
                when={session()}
                fallback={<button onClick={CallSignIn}>Sign in</button>}
            >
                <span>{session()?.user?.name}</span>
                <img class="user-img" src={session()?.user.image}></img>
                <button onClick={CallSignOut}>Sign Out</button>
            </Show>
        </div>
    </div>);
}
