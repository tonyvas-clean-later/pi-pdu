const socketio = require('socket.io')

class SocketIOServer{
    constructor(server){
        this.io = socketio(server)
    }
}

module.exports = SocketIOServer;