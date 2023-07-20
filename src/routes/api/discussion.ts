import { APIEvent, json } from "solid-start/api";
import { createDiscussion } from '~/lib/github/discussions';

export async function POST({ request: { body }}: APIEvent) {
    // const response = await addReply(comment, discussionId)
    // return json(response);
    const { discussionBody, title, categoryId } = await new Response(body).json()
    const response = await createDiscussion(discussionBody, title, categoryId)
    return json(response);
}