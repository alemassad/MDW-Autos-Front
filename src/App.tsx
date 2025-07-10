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
import Layout from "./components/Layout";
import AutoDelete from "./pages/AutoDelete";
import AutoAdd from "./pages/AutoAdd";
import AutoEdit from "./pages/AutoEdit";
import BuscarId from "./pages/AutoEdit/BuscarId";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/Category";
import CategoryAdd from "./pages/CategoryAdd";
import CategoryEdit from "./pages/CategoryEdit";
import BuscarIdCategory from "./pages/CategoryEdit/BuscarId";
import CategoryDelete from "./pages/CategoryDelete";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser
          ?.getIdToken(true)
          .then((token) => localStorage.setItem("token", token));
        setUser(user);
        setCheckingAuth(false);
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
      <Layout>
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
          <Route
            path="/autos/buscar"
            element={
              <ProtectedRoute user={user}>
                <Auto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/autos/borrar"
            element={
              <ProtectedRoute user={user}>
                <AutoDelete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/autos/agregar"
            element={
              <ProtectedRoute user={user}>
                <AutoAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/autos/modificar/:id"
            element={
              <ProtectedRoute user={user}>
                <AutoEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/autos/modificar"
            element={
              <ProtectedRoute user={user}>
                <BuscarId />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute user={user}>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id" // Ruta para ver una categoría específica por ID
            element={
              <ProtectedRoute user={user}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/buscar" // Ruta para la página de búsqueda de categorías
            element={
              <ProtectedRoute user={user}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/agregar" // <-- Nueva ruta para agregar categorías
            element={
              <ProtectedRoute user={user}>
                <CategoryAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/modificar/:id" // <-- Nueva ruta para editar una categoría específica
            element={
              <ProtectedRoute user={user}>
                <CategoryEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/modificar" // <-- Nueva ruta para buscar categoría por ID antes de modificar
            element={
              <ProtectedRoute user={user}>
                <BuscarIdCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/borrar" // <-- Nueva ruta para eliminar categorías
            element={
              <ProtectedRoute user={user}>
                <CategoryDelete />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
