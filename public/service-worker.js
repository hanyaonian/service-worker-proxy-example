/** @type {ServiceWorkerGlobalScope} */
const worker = this;

worker.addEventListener("install", () => {
  console.log("Service Worker installing.");
});

worker.addEventListener("fetch", async (event) => {
  const request = event.request;
  const request_url = request.url;
  const url_object = new URL(request_url, location.origin);
  const version = url_object.searchParams.get("version");

  // proxy for html request only.
  if (version && request.headers.get("Accept")?.includes("text/html")) {
    url_object.pathname = `${version}${url_object.pathname}`;

    console.log(`change ${client_url} to ${url_object.pathname}`);

    return event.respondWith(
      fetch(url_object.toString()).catch((err) => {
        // report: console.err(err);
        return fetch(request);
      })
    );
  }

  return event.respondWith(fetch(event.request));
});
