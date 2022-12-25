console.clear()

const ExpressServer = require('./express-server');
const SocketIOServer = require('./socketio-server');

let port = process.env.HTTP_PORT || 8080;
let httpPublic = `${__dirname}/public`;

let expressServer = new ExpressServer(port, httpPublic);
let ioServer = new SocketIOServer(expressServer.server);

