import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../config/firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Loginprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Login(props: Loginprops) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      props.setUser(userCredential.user);
      navigate("/chat");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div>Error: {error}</div>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
