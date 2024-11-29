import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebase";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import Start from "./pages/Start";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start loading={loading} user={user} />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<SignUp user={user} setUser={setUser} />}
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
