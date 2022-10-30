import { usWest2 } from 'lib/db';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler() {
    const games = await usWest2.selectFrom('Game').selectAll().execute();

    return new Response(JSON.stringify({ games }), {
        status: 200,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'access-control-allow-origin': '*',
        },
    });
}
