import { geolocation } from '@vercel/edge';
import { closestDbConnection } from 'lib/db';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler(req: Request) {
    const { longitude, latitude } = geolocation(req);

    const games = await closestDbConnection(longitude ?? '0', latitude ?? '0')
        .selectFrom('Game')
        .selectAll()
        .execute();

    return new Response(JSON.stringify({ games }), {
        status: 200,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'access-control-allow-origin': '*',
        },
    });
}
