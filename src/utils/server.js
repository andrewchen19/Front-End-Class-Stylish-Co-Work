const express = require("express");
const app = express();

//將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
const server = require("http")
  .Server(app)
  .listen(3000, () => {
    console.log("open server!");
  });

//將啟動的 Server 送給 socket.io 處理
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "https://localhost:8080",
      "http://127.0.0.1:5500",
      "https://stylish-co-work-dc904.web.app",
    ],
    methods: ["GET", "POST"],
  },
});

//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on("connection", (socket) => {
  //經過連線後在 console 中印出訊息

  console.log("success connect!");

  socket.on("disconnect", () => {
    console.log("Client disconnected!");
  });
  //監聽透過 connection 傳進來的事件
  socket.on("/app/chat.sendMessage", (message) => {
    console.log(message);
    socket.broadcast.emit("/app/chat.sendMessage", message);
  });
});
