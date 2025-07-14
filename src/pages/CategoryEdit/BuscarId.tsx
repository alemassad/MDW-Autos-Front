// File: src/pages/CategoryEdit/BuscarId.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import categoryImage from "../../assets/autoreuters.jpg"; // Puedes usar una imagen relevante para categorías

// Importar axios para hacer la consulta
import axios from "../../config/axios";

const BuscarIdCategory = () => {
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!inputId.trim()) return;
    try {
      const res = await axios.get(`/categories/${inputId.trim()}`);
      if (res.data && res.data.data) {
        navigate(`/categories/modificar/${inputId.trim()}`);
      } else {
        setError("No se encontró una categoría con ese ID.");
      }
    } catch {
      setError("No se encontró una categoría con ese ID.");
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${categoryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className={globalStyles.title}>Modificar Categoría por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        {error && (
          <p className={globalStyles.formError} style={{ textAlign: "center" }}>{error}</p>
        )}
        <label className={globalStyles.formLabel} htmlFor="categoryId">
          ID de la Categoría
        </label>
        <input
          id="categoryId"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Ingresar Id de la categoría"
          className={globalStyles.formInput}
          required
        />
        <button type="submit" className={globalStyles.formButton}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default BuscarIdCategory;
