import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Automotores from "./pages/Autos";
import About from "./pages/About";
import Auto from "./pages/Auto";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Automotores />} />
        <Route path="/autos/:id" element={<Auto />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Automotores />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
