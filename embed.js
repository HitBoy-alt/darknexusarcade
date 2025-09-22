"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  let destination = "";

  try {
    destination = new URL(location.hash.slice(1)).toString();
  } catch {
    alert("Invalid URL in hash! Example: embed.html#https://example.com");
    return;
  }

  try {
    await registerSW();
    location.href = __uv$config.prefix + __uv$config.encodeUrl(destination);
  } catch (err) {
    alert("Service worker registration or redirect failed:\n" + err);
  }
});
