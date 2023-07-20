import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getDeployment } from "~/lib/vercel/deployment";

export function routeData() {
	return createServerData$(() => getDeployment());
}

export default function About() {
    const deployment = useRouteData<typeof routeData>();

    const { uid = "", url = "", created = ""} = deployment() ?? {};
    return (
        <>
            <div>Welcome to this amazing Solid app!</div>
            <img src="github.png"></img>
            <div>
                <h3>Deployment</h3>
                <ul>
                    <li>UID: {uid}</li>
                    <li>URL: {url}</li>
                    <li>Created: {`${new Date(created)}`}</li>
                </ul>
            </div>
        </>
    );
}
