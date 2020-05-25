import requestApi from './module/request-api';

const personName: string = ' 小心者';
console.log(`Hello ${personName}!`);

const API_URL: string = "https://liginc.co.jp/wp-json/wp/v2/posts?_embed&per_page=9";
console.log(requestApi(API_URL));
