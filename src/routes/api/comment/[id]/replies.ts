import { APIEvent, json } from "solid-start/api";
import { getReplies } from "~/lib/github/discussions";

export async function GET({ params }: APIEvent) {
    const response = await getReplies(params.id);
    return json(response);
}