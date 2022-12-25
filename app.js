console.clear()

const ExpressServer = require('./express-server');
const SocketIOServer = require('./socketio-server');
const AnalogDigitalConverter = require('./adc');

let port = process.env.HTTP_PORT || 8080;
let httpPublic = `${__dirname}/public`;

let expressServer = new ExpressServer(port, httpPublic);
let ioServer = new SocketIOServer(expressServer.server);
let adc = new AnalogDigitalConverter();

let isRunning = false;
let handle = setInterval(() => {
    if (!isRunning){
        isRunning = true;
        run().then(() => {
            
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            isRunning = false;
        })
    }
}, 1);

function run(){
    return new Promise((resolve, reject) => {
        adc.read().then(data => {
            console.log(data);
            ioServer.io.emit('data', data);
            resolve();
        }).catch(reject);
    })
}