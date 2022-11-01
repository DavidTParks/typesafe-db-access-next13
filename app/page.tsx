import { headers } from 'next/headers';
import { closestDbConnection } from 'lib/db';

async function getData() {
    const longitude = headers().get('x-vercel-ip-longitude') ?? '0';
    const latitude = headers().get('x-vercel-ip-latitude') ?? '0';

    const games = await closestDbConnection(longitude, latitude)
        .selectFrom('Game')
        .selectAll()
        .execute();

    return games;
}

export default async function Page() {
    const games = await getData();
    return (
        <div>
            {games.map((game) => (
                <div key={game.id}>{JSON.stringify(game)}</div>
            ))}
        </div>
    );
}
