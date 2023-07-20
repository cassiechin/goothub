import { requireEnv } from "~/lib/requireEnv";
import { Deployment } from "~/lib/vercel/types";

export async function getDeployment(): Promise<Deployment> {
    if (!process || !process.env) {
        return {} as Deployment;
    }

    const response = await fetch(`https://api.vercel.com/v6/deployments?teamId=${requireEnv('VERCEL_TEAM_ID')}&app=goothub&target=production&limit=1`, {
        "headers": {
            "Authorization": `Bearer ${requireEnv('VERCEL_ACCESS_TOKEN')}`
        },
        "method": "get"
    });
    const { deployments } = await response.json();

    return (deployments ? deployments[0] : {}) as Deployment;
}
