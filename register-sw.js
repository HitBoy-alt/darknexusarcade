"use strict";

const swAllowedHostnames = ["localhost", "127.0.0.1"];
const swPath = "/hitboy/rizz.sw.js";

async function registerSW() {
  if (!navigator.serviceWorker) {
    if (location.protocol !== "https:" && !swAllowedHostnames.includes(location.hostname))
      throw new Error("Service workers require HTTPS.");
    throw new Error("Your browser does not support service workers.");
  }

  await navigator.serviceWorker.register(swPath, {
    scope: __uv$config.prefix,
  });
}
