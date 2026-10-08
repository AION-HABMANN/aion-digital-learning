// A tiny static server for the exported site (out/): `node scripts/serve-out.cjs 4100`. A dev server hides production-only bugs (CLAUDE.md #10).
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "out");
const port = Number(process.argv[2] || 4100);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain", ".woff2": "font/woff2" };
http
  .createServer((req, res) => {
    let p = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
    let f = path.join(root, p);
    if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) { f = path.join(root, "404.html"); res.statusCode = 404; }
    res.setHeader("Content-Type", types[path.extname(f)] || "application/octet-stream");
    fs.createReadStream(f).pipe(res);
  })
  .listen(port, () => console.log("serving out/ on http://127.0.0.1:" + port));
