self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.pathname === "/hitboy/" && url.searchParams.has("url")) {
    const targetUrl = url.searchParams.get("url");
    event.respondWith(
      fetch(targetUrl, {
        mode: 'cors',
        credentials: 'omit',
      }).catch(() => new Response("Proxy fetch failed", { status: 502 }))
    );
  }
});
