import express from "express";
const app = express();
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg: string) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.listen(5000);
