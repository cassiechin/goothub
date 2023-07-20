import { createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { requireEnv } from "~/lib/requireEnv";
import { Deployment } from "~/lib/vercel/types";

export function routeData() {
    const [deployment] = createResource(async () => {
        const response = await fetch("https://api.vercel.com/v6/deployments?app=goothub&target=production&limit=1", {
            "headers": {
                "Authorization": `Bearer ${requireEnv('VERCEL_ACCESS_TOKEN')}`
            },
            "method": "get"
        });
        const { deployments } = await response.json();

        return (deployments ? deployments[0] : {}) as Deployment;
    });
    return { deployment };
}

export default function About() {
    const { deployment } = useRouteData<typeof routeData>();

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
