import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getDeployment } from "~/lib/vercel/deployment";
import './about.css';

export function routeData() {
    const deployment = createServerData$(async () => getDeployment());

    return { deployment };
}

export default function About() {
    const { deployment } = useRouteData<typeof routeData>();

    return (
        <div class="body-container about-page">        
			<h1>About</h1>
            <div>
                <h2>Team</h2>
                <ul class="list-disc">
                    <li>Cassie Chin</li>
                    <li>Maria Khomenko</li>
                    <li>Tiffany Shiu</li>
                    <li>Tony Huynh</li>
                </ul>
            </div>
            <div>
                <h2>Deployment</h2>
                <ul class="list-disc">
                    <li>UID: {deployment()?.uid}</li>
                    <li>URL: {deployment()?.url}</li>
                    <li>Created: {`${new Date(deployment()?.created || 0)}`}</li>
                </ul>
            </div>
        </div>
    );
}
