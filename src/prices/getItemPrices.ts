import fetchJson from '../utils/fetchJson';
import measure from '../utils/measure';

export default async function getItemPrices(items: string[], locations: string[]) {
    console.log(`Fetching prices data`);

    const { data, elapsedSeconds } = await measure(() => fetchJson(getRequestUrl(items, locations));
    
    console.log(`Time elapsed: ${elapsedSeconds} seconds`);

    return data;
}

function getRequestUrl(items: string[], locations: string[]) {
    if (!items.length || !locations.length) {
        throw new Error("Invalid items or locations");
    }

    const joinedItems = items.join(",");
    const joinedLocations = loactions.json(",");
    return `https://www.albion-online-data.com/api/v2/stats/prices/${joinedItems}.json?locations=${joinedLocations}&qualities=0`;
}