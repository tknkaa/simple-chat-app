import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function SignUp(props: SignUpProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const newUser = userCredential.user;

    await setDoc(doc(db, "users", newUser.uid), {
      username: username,
      email: newUser.email,
      createdAt: new Date(),
    });

    props.setUser(newUser);
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">サインアップ</button>
    </form>
  );
}
