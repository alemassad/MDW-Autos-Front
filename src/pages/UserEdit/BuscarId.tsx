import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import miraAuto from "../../assets/miraAuto.webp";
import axios from "../../config/axios";

const BuscarUserId = () => {
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!inputId.trim()) return;
    try {
      const res = await axios.get(`/users/${inputId.trim()}`);
      if (res.data && res.data.data) {
        navigate(`/users/modificar/${inputId.trim()}`);
      } else {
        setError("No se encontró un usuario con ese ID.");
      }
    } catch {
      setError("No se encontró un usuario con ese ID.");
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${miraAuto})`,
        backgroundSize: "cover"
      }}
    >
      <h1 className={globalStyles.title}>Modificar Usuario por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        {error && (
          <p className={globalStyles.formError} style={{ textAlign: "center" }}>{error}</p>
        )}
        <label className={globalStyles.formLabel} htmlFor="autoId">
          ID del Usuario
        </label>
        <input
          id="userId"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Ingresar Id"
          className={globalStyles.formInput}
        />
        <button type="submit" className={globalStyles.formButton}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default BuscarUserId;
