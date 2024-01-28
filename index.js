const http = require("node:http");
const fsp = require("node:fs/promises");

const server = http.createServer();

server.on("request", (req, res) => {
  const route = new URL(req.url, `http://${req.headers.host}`);
  const fileName = `.${
    route.pathname === "/" ? "/index" : route.pathname
  }.html`;

  const writeContent = async () => {
    try {
      const data = await fsp.readFile(fileName, "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(data);
    } catch (error) {
      const notFound = await fsp.readFile("./404.html", "utf8");
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end(notFound);
    }
  };

  writeContent();
});

server.listen(8080, () => console.log("listening request at port 8080.."));
