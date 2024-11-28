import express from "express";
const app = express();
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./db/connection";
import { Message as MessageModel } from "./models/messageModel";

app.use(cors());
app.use(express.json());

interface Message {
  username: string;
  message: string;
  timestamp: Date;
}
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

connectDB();

io.on("connection", (socket) => {
  console.log("a user connected");

  MessageModel.find<Message>()
    .sort({ timestamp: 1 })
    .then((messages: Message[]) => {
      socket.emit("load message", messages);
    });

  socket.on("chat message", async (msg: Message) => {
    const newMessage = new MessageModel(msg);
    await newMessage.save();
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(5000);
