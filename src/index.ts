/// <reference lib="webworker" />

async function main() {
  installWokrer();
  displayContent();
}

function installWokrer() {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.register("/service-worker.js", {
      scope: "./",
    });
  }
  return Promise.reject();
}

function displayContent() {
  const content_el = document.querySelector("#content");
  const message = `current version is ${getVersion()}`;
  console.log(message);

  if (content_el) {
    content_el.innerHTML = message;
  }
}

function getVersion() {
  return import.meta.env.VITE_APP_VERSION || "default version";
}

main();
