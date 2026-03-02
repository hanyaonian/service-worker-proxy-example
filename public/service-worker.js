/** see @link https://vite-pwa-org-zh.netlify.app/guide/ */

/** @type {ServiceWorkerGlobalScope} */
const worker = this;

worker.addEventListener("install", () => {
  console.log("Service Worker installing.");
});

// ...hash case, etc.
function isHtmlRequest(url) {
  return url === "/" || url.endsWith("html");
}

worker.addEventListener("fetch", async (event) => {
  const request = event.request;
  const request_url = request.url;
  const url_object = new URL(request_url, location.origin);
  const version = url_object.searchParams.get("version");
  console.log(request.headers.get("Accept"), request.url, version);

  if (!version) return event.respondWith(fetch(event.request));

  // proxy for html request only.
  if (
    isHtmlRequest(url_object.pathname) ||
    request.headers.get("Accept") === "text/html"
  ) {
    url_object.pathname = `${version}${url_object.pathname}`;
    url_object.searchParams.delete("version");
    console.log(`change ${url_object} to ${url_object.pathname}`);

    return event.respondWith(
      fetch(url_object.toString()).catch((err) => {
        // report: console.err(err);
        console.error(err);
        return fetch(request);
      }),
    );
  }
});
