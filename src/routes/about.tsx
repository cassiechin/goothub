import { createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { getDeployment } from "~/lib/vercel/deployment";
import { Deployment } from "~/lib/vercel/types";

export function routeData() {
    const [deployment] = createResource(async () => getDeployment());

    return { deployment };
}

export default function About() {
    const { deployment } = useRouteData<typeof routeData>();

    const { uid = "", url = "", created = "" } = (deployment() ?? {}) as Deployment;
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
