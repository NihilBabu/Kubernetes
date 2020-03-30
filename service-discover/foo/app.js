var http = require("http");
const port = process.env.PORT || 3000
const API = process.env.APIURL || 'localhost'
const APIPORT = process.env.APIPORT || 3001
    // hostname: 'localhost',
const options = {
    hostname: API,
    port: APIPORT,
    path: '/',
    method: 'GET'
}

http.createServer(function(request, response) {

    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end(JSON.stringify({ foo: d.toString() }));
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.end(JSON.stringify({ foo: 'ERROR' }));
        console.error(error)
    })

    req.end()


}).listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);