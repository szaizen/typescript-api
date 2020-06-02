import axios from 'axios';
// import { wp } from './array/wp';

export default async function requestApi(url: string) {
    const results = await axios.get(url);
    return results;
}
