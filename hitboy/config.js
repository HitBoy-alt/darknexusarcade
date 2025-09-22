// Ultraviolet codec XOR encode/decode (minimal version)
const Ultraviolet = {
  codec: {
    xor: {
      encode(url) {
        const key = 7; // simple XOR key
        let result = "";
        for (let i = 0; i < url.length; i++) {
          result += String.fromCharCode(url.charCodeAt(i) ^ key);
        }
        return encodeURIComponent(btoa(result));
      },
      decode(encoded) {
        const key = 7;
        const decoded = atob(decodeURIComponent(encoded));
        let result = "";
        for (let i = 0; i < decoded.length; i++) {
          result += String.fromCharCode(decoded.charCodeAt(i) ^ key);
        }
        return result;
      }
    }
  }
};

self.__uv$config = {
  prefix: "/hitboy/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/hitboy/handler.js",
  client: "/hitboy/client.js",
  bundle: "/hitboy/bundle.js",
  config: "/hitboy/config.js",
  sw: "/hitboy/rizz.sw.js",
};
