export default function requestApi(url: string) {
  const $body: HTMLInputElement = document.getElementById("body") as HTMLInputElement;
  $body.classList.add("loading");

  return new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          resolve(this);
        }
        $body.classList.remove("loading");
      }
    };
    xhr.responseType = "json";
    xhr.open("GET", url, true);
    xhr.send();
  });
}
