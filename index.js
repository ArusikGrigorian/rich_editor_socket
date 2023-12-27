const express = require("express");
const ws = require("ws");

const app = express();
const server = app.listen(3001, () => console.log("The server is running!"));
const wsServer = new ws.Server({ noServer: true });

const clients = [];

wsServer.on("connection", (socket) => {
  clients.push(socket);

  socket.on("message", (message) => {
    clients.forEach((client) => client.send(message));
  });
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
