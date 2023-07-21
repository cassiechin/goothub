import { APIEvent, json } from "solid-start/api";
import { addReaction } from '~/lib/github/discussions';

export async function POST({ request: { body }}: APIEvent) {
    const {content, subjectId} = await new Response(body).json()
    const response = await addReaction(content, subjectId)
    return json(response);
}