"use strict";

(async () => {
  let destination = "";

  try {
    destination = new URL(location.hash.slice(1)).toString();
  } catch {
    alert("Invalid URL in hash! Use format: embed.html#https://example.com");
    return;
  }

  try {
    await registerSW();

    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(destination);
  } catch (e) {
    alert("Service worker registration or redirect failed: " + e);
  }
})();
