const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;

// Decode URL function, same XOR key as client-side
function decodeUrl(encoded) {
  const key = 7;
  const decoded = Buffer.from(decodeURIComponent(encoded), 'base64').toString('utf-8');
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(decoded.charCodeAt(i) ^ key);
  }
  return result;
}

app.use(express.static("public")); // serve static files (embed.html, JS, CSS, etc)

app.get("/hitboy/hitboy/:encodedUrl(*)", async (req, res) => {
  try {
    const targetUrl = decodeUrl(req.params.encodedUrl);

    // Fetch the target URL and pipe the response back
    const response = await fetch(targetUrl);

    // Forward headers except restricted ones
    for (const [key, value] of response.headers.entries()) {
      if (key.toLowerCase() === "content-security-policy") continue;
      if (key.toLowerCase() === "content-encoding") continue;
      res.setHeader(key, value);
    }

    res.status(response.status);
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`HitBoy proxy backend listening on http://localhost:${PORT}`);
});
