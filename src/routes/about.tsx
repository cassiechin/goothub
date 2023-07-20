import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getDeployment } from "~/lib/vercel/deployment";

export function routeData() {
    const deployment = createServerData$(async () => getDeployment());

    return { deployment };
}

export default function About() {
    const { deployment } = useRouteData<typeof routeData>();

    return (
        <main>        
			<h1>About</h1>
            <div>
                <img src="github.png"></img>                
            </div>
            <div>
                <h2>Deployment</h2>
                <ul>
                    <li>UID: {deployment()?.uid}</li>
                    <li>URL: {deployment()?.url}</li>
                    <li>Created: {`${new Date(deployment()?.created || 0)}`}</li>
                </ul>
            </div>
        </main>
    );
}
