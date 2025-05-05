/** @type {ServiceWorkerGlobalScope} */
const worker = this;

worker.addEventListener("install", () => {
  console.log("Service Worker installing.");
});

// get client: event.clientId
worker.addEventListener("fetch", async (event) => {
  const request = event.request;

  const client_url = request.url;

  if (request.method !== "GET") return event.respondWith(fetch(request));

  const version = new URL(client_url).searchParams.get("version");

  // proxy for html request only.
  if (version && request.headers.get("Accept")?.includes("text/html")) {
    const request_url = new URL(request.url);

    request_url.pathname = `${version}${request_url.pathname}`;

    console.log(`change ${request.url} to ${request_url.pathname}`);

    return event.respondWith(
      fetch(request_url.toString()).catch((err) => {
        console.err(err);
        return fetch(request);
      })
    );
  }

  return event.respondWith(
    // use cache
    // caches.match(event.request).then((response) => {
    //   return response || fetch(event.request);
    // })
    fetch(event.request)
  );
});
