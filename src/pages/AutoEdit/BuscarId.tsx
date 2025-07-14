import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import miraAuto from "../../assets/miraAuto.webp";

// Importar axios para hacer la consulta
import axios from "../../config/axios";

const BuscarId = () => {
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!inputId.trim()) return;
    try {
      const res = await axios.get(`/cars/${inputId.trim()}`);
      if (res.data && res.data.data) {
        navigate(`/autos/modificar/${inputId.trim()}`);
      } else {
        setError("No se encontró un auto con ese ID.");
      }
    } catch {
      setError("No se encontró un auto con ese ID.");
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${miraAuto})`,
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
      <h1 className={globalStyles.title}>Modificar Auto por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        {error && (
          <p className={globalStyles.formError} style={{ textAlign: "center" }}>{error}</p>
        )}
        <label className={globalStyles.formLabel} htmlFor="autoId">
          ID del auto
        </label>
        <input
          id="autoId"
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

export default BuscarId;
