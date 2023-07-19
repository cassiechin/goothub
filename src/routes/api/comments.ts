import { APIEvent, json } from "solid-start/api";
import { addReply } from '~/lib/github/discussions';

// TODO, rename file to signify a comment reply??
// TODO, move discussionId into URL?
export async function POST({ request: { body }}: APIEvent) {
    // const response = await addReply(comment, discussionId)
    // return json(response);
    const { comment, discussionId } = await new Response(body).json()
    console.log("POSTING!", {comment}, {discussionId});
    const response = await addReply(comment, discussionId)
    return json(response);
}