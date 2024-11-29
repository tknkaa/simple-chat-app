import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "firebase/auth";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Message {
  username: string;
  message: string;
  timestamp: Date;
}

interface ChatProps {
  user: User | null;
}

export default function Chat(props: ChatProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");

  const fetchUserName = async (uid: string) => {
    const userDocRef = await doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw new Error("user doesn't exist.");
    } else {
      const userData = userDocSnap.data();
      setUsername(userData.username);
    }
  };

  if (props.user === null) {
    throw new Error("user doesn't exist.");
  } else {
    fetchUserName(props.user.uid);
  }

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER_URL);

    socketRef.current.on("load message", (msgs: Message[]) => {
      setMessages(msgs);
    });

    socketRef.current.on("chat message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg: Message = { username, message, timestamp: new Date() };
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
            <span>
              {msg.username}: {msg.message}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
