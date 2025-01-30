// socket.js

const { Server: SocketIOServer } = require("socket.io");

let io;

const initSocket = (server) => {
    if (!io) {
        io = new SocketIOServer(server, {
            cors: { origin: "*" },
        });
        // console.log("Socket.io initialized");
    }
    return io;
};

const getSocket = () => {
    if (!io) {
        throw new Error("Socket.io not initialized yet");
    }
    return io;
};

module.exports = { initSocket, getSocket };
