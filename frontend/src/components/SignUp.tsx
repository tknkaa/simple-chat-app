import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db} from "../config/firebase";
import React, { useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;

         await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: user.email,
            createdAt: new Date()
         });
    }

    return (
        <form onSubmit={(e) => handleSignup(e)}>
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
    )
}