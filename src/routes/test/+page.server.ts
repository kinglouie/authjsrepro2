/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const sessionid = cookies.set('test', "testval", {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 60 * 60 * 24 * 30
    });
}