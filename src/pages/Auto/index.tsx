import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getAutoById } from "../../slices/auto";
import buscaaut from "../../assets/buscaaut.jpg";

const Auto = () => {
  const { id: paramId } = useParams();
  const [inputId, setInputId] = useState<string>(paramId || "");
  const dispatch = useDispatch();
  const { auto, loading, error } = useSelector((state) => state.reducer.auto);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramId) {
      setInputId(paramId);
      dispatch(getAutoById(paramId));
    }
  }, [paramId, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      navigate(`/autos/${inputId.trim()}`);
    }
  };

  return (
    <div className={globalStyles.container}>
      <h1 className={globalStyles.title}>Buscar Vehículo por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
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
      {loading ? (
        <div className={globalStyles.spinner}></div>
      ) : error ? (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      ) : auto ? (
        <div className={globalStyles.formAuto} style={{ marginTop: "2rem" }}>
          <h2 style={{ textAlign: "center" }}>{auto.name}</h2>
          <p>
            <b>ID:</b> {auto._id}
          </p>
          <p>
            <b>Descripción:</b> {auto.description}
          </p>
          <p>
            <b>Stock:</b> {auto.amount}
          </p>
          <p>
            <b>Precio:</b> u$s {auto.price}
          </p>
          {auto.ownerId && (
            <p>
              <b>Propietario:</b> {auto.ownerId}
            </p>
          )}
          {auto.image && (
            <img
              src={auto.image}
              alt={auto.name}
              style={{
                width: "100%",
                borderRadius: 8,
                marginTop: 8,
              }}
            />
          )}
        </div>
      ) : null}
      <img
        src={buscaaut}
        alt="Imagen de automotores"
        className={globalStyles.image}
      />
    </div>
  );
};

export default Auto;
