// This file overwrites the stock UV config.js

self.__uv$config = {
  prefix: "/hitboy/",
  bare: "/bare/",
  
  // Removed encoding functions
  encodeUrl: (url) => url,
  decodeUrl: (url) => url,
  
  handler: "/hitboy/handler.js",
  client: "/hitboy/client.js",
  bundle: "/hitboy/bundle.js",
  config: "/hitboy/config.js",
  sw: "/hitboy/rizz.sw.js",
};
