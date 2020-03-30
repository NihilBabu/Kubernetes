var http = require("http");
const port = process.env.PORT || 3000

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end(JSON.stringify({ bar: new Date(), version: "V1" }));
}).listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);