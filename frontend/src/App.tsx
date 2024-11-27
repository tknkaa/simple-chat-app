import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

interface Message {
  username: string;
  message: string;
}

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>(
    "User" + Math.floor(Math.random() * 1000),
  );

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    socketRef.current.on("chat message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg: Message = { username, message };
      socketRef.current?.emit("chat message", msg);
      setMessage("");
    }
  };

  return (
    <>
      <h1>chat app</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="type message"
      />
      <button onClick={sendMessage}>submit</button>
      <h2>chat history</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <span>{msg.username}</span>
            <span>{msg.message}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
