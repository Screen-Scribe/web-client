import { getUsers } from "$lib/db";

export async function POST() {
    const users = await getUsers()

	return new Response(
        JSON.stringify(users), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}