const express = require('express');
const cluster = require('cluster');
const numCPUS = require('os').cpus().length;

const app = express();


if (cluster.isMaster) {
    for (var i = 0; i < numCPUS; i++) {
        cluster.fork()
        console.log(`Forking process number ${i}...`);
    }
} else {
    app.use("*", (req, res, next) => {
        console.log(`request from ${req.connection.remoteAddress} ===> to ${req.originalUrl}`)
        next();
    });



    app.get('/', (req, res) => {
        res.send('Welcome to node')
    })

    app.listen(3000)

}




