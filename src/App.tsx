import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Automotores from "./pages/Autos";
import About from "./pages/About";
import Auto from "./pages/Auto";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import globalStyles from "./pages/Pages.module.css";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser?.getIdToken(true).then((token) => localStorage.setItem("token", token));
        setUser(user);
        return;
      }

      setUser(null);
      localStorage.removeItem("token");
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {

    return <div className={globalStyles.spinner}></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/autos"
          element={
            <ProtectedRoute user={user}>
              <Automotores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/autos/:id"
          element={
            <ProtectedRoute user={user}>
              <Auto />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
