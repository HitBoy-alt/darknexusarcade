self.__uv$config = {
  prefix: "/hitboy/",
  bare: "/bare/",

  encodeUrl: (url) => url,     // No encoding
  decodeUrl: (url) => url,

  handler: "/hitboy/handler.js",
  client: "/hitboy/client.js",
  bundle: "/hitboy/bundle.js",
  config: "/hitboy/config.js",
  sw: "/hitboy/rizz.sw.js",
};
