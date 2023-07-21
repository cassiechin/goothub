import { APIEvent, json } from "solid-start/api";
import { createDiscussion } from '~/lib/github/discussions';

export async function POST({ request: { body }}: APIEvent) {
    // const response = await addReply(comment, discussionId)
    // return json(response);
    const { discussionBody, title } = await new Response(body).json()
    const response = await createDiscussion(discussionBody, title)
    return true;
    return json(response);
}

// import { APIEvent, json } from "solid-start/api";
// import { addReply } from '~/lib/github/discussions';

// // TODO, rename file to signify a comment reply??
// // TODO, move discussionId into URL?
// export async function POST({ request: { body }}: APIEvent) {
//     // const response = await addReply(comment, discussionId)
//     // return json(response);
//     const { comment, discussionId, commentId } = await new Response(body).json()
//     const response = await addReply(comment, discussionId, commentId)
//     return json(response);
// }