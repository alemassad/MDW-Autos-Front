import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import miraAuto from "../../assets/miraAuto.webp";

const BuscarUserId = () => {
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      navigate(`/users/modificar/${inputId.trim()}`);
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
      <h1 className={globalStyles.title}>Modificar Usuario por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
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
