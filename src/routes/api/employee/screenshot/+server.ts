import { anthropic } from "$lib/anth";
import { addScreenshot, getUser } from "$lib/db";

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const {img} = await request.json()

    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        system: "Analyze the following screenshot and provide a brief description of what's happening on the employee's screen. Provide context working on. The very first line should contain either True or False for whether the employee seems to be doing work, the description should be in the rest of the lines.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: img
                }
              },
            ]
          }
        ]
      });

      addScreenshot("1", {
        image: img, 
        response: msg.content[0].text,
        timestamp: (new Date()).getTime(),
        working: msg.content[0].text.split("\n", 1)[0] == "True" ? true : false
      })

	return new Response("200", {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}