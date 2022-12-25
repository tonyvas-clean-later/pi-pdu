const http = require('http');
const express = require('express');

class ExpressServer{
    constructor(port, publicPath){
        this.app = express();
        this.server = http.createServer(this.app);

        this.app.use(express.static(publicPath))

        this.server.listen(port);
    }
}

module.exports = ExpressServer;