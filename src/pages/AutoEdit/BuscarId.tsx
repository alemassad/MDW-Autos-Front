import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";

const BuscarId = () => {
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      navigate(`/autos/modificar/${inputId.trim()}`);
    }
  };

  return (
    <div className={globalStyles.container}>
      <h1 className={globalStyles.title}>Modificar Auto por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="autoId">ID del auto</label>
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
