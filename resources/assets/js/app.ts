import formatData from "./modules/format-data";
import createDom from "./modules/create-dom";
import requestApi from "./modules/request-api";
import getApiUrl from "./modules/get-api-url";
import Pagination from "./class/pagination";

const $add: HTMLInputElement = document.getElementById("js-add") as HTMLInputElement;
const $pagination: HTMLInputElement = document.getElementById("js-pagination") as HTMLInputElement;
const $search: HTMLInputElement = document.getElementById("js-search-btn") as HTMLInputElement;

// interface category {
//   id: number,
//   name: string,
//   url: string
// }
let categoryList:{id: number, name: string, url: string}[] = [];

let currentData = {
  type: "post", // post or category or search
  page: 1, // 現在のページ番号
  searchText: "", // 検索時のワード
  cateogyrId: "" // カテゴリー検索時のID
};

// API URL
const API_URL = "https://liginc.co.jp/wp-json/wp/v2/posts?_embed&per_page=9";
const CATEGORY_URL = "https://liginc.co.jp/wp-json/wp/v2/categories?per_page=100";

// カテゴリー取得、サイドバー更新
addCategory();

// 記事一覧
addCard();

/* ------------------------------------
 * クリックイベント
 *------------------------------------*/

// 検索時
$search.addEventListener("click", () => {
  currentData.type = "search";
  currentData.page = 1;
  const $searchText: HTMLInputElement = document.getElementById("js-search-text") as HTMLInputElement;
  currentData.searchText = $searchText.value;
  addCard();
});

// ページネーション
$pagination.addEventListener("click", e => {
  let clickPage: number = Number((e.target as HTMLInputElement).dataset.pagenumber);
  currentData.page = clickPage;
  addCard();
});

/* ------------------------------------
 * 関数
 *------------------------------------*/

// カテゴリー追加
async function addCategory() {
  let result: any = await requestApi(CATEGORY_URL);
  console.log(result);
  categoryList = result.response.map(el => {
    return { id: el.id, name: el.name, url: el.link };
  });
  addSidebarCategoryList();
}

// サイドバーにカテゴリー一覧表示
function addSidebarCategoryList() {
  let $ul: HTMLInputElement = document.getElementById("js-category-list") as HTMLInputElement;

  console.log(categoryList);
  $ul.innerHTML = categoryList
    .map((item) => `<li data-categoryid="${item.id}">${item.name}</li>`)
    .join("");
  $ul.addEventListener("click", e => {
    currentData.cateogyrId = (e.target as HTMLInputElement).dataset.categoryid as string;
    currentData.page = 1;
    currentData.type = "category";
    addCard();
  });
}

// 記事追加
async function addCard() {
  let url = API_URL + encodeURI(getApiUrl(currentData)); // アクセスするAPIURLを生成
  let result: any = await requestApi(url); // データ取得
  let response = result.response; // データ内からresponseを取り出す
  let articleTotal = result.getResponseHeader("x-wp-total"); // データ内から総記事数を取り出す

  $add.textContent = null; // HTMLリセット
  if (response.length === 0) {
    $add.innerText = "該当する記事はありませんでした";
  } else {
    response.forEach(response => {
      const cardInformation = formatData(response, categoryList); // データを整形
      const cardHtml = createDom(cardInformation); // HTML作成
      $add.appendChild(cardHtml); // HTML書き込み
    });
  }

  // 記事総件数 追加
  const $totalNumber: HTMLInputElement = document.getElementById("js-article-total") as HTMLInputElement;
  $totalNumber.innerText = articleTotal;
  // ページネーション更新
  new Pagination(
    currentData.page,
    5,
    result.getResponseHeader("x-wp-totalpages"),
    $pagination
  );
}
