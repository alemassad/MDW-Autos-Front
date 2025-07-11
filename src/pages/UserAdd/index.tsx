import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { addUser } from "../../slices/userAdd";
import registraAuto from "../../assets/registraAuto.avif";

const UserAdd = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reducer.userAdd);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ name, lastname, birthdate, email, password, isAdmin })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/users");
      }
    });
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${registraAuto})`,
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
      <h1 className={globalStyles.title}>Agregar Usuario</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresar nombre"
          className={globalStyles.formInput}
        />
        <label className={globalStyles.formLabel} htmlFor="lastname">
          Apellido
        </label>
        <input
          id="lastname"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Ingresar apellido"
          className={globalStyles.formInput}
        />
        <label className={globalStyles.formLabel} htmlFor="birthdate">
          Fecha de nacimiento
        </label>
        <input
          id="birthdate"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={globalStyles.formInput}
        />
        <label className={globalStyles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresar email"
          className={globalStyles.formInput}
        />
        <label className={globalStyles.formLabel} htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Ingresar contraseña"
          className={globalStyles.formInput}
        />
        <label className={globalStyles.formLabel} htmlFor="isAdmin">
          ¿Es administrador?
        </label>
        <div className={globalStyles.formCheckboxContainer}>
          <input
            id="isAdmin"
            type="checkbox"
            //value={isAdmin ? "true" : "false"}
            checked={isAdmin}
            onChange={(e) => setAdmin(e.target.checked)}
            className={globalStyles.formCheckbox}
          />
          <span
            className={globalStyles.formCheckboxLabel}
            style={{ color: isAdmin ? "green" : "red" }}
          >
            {isAdmin ? "Sí" : "No"}
          </span>
        </div>
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar"}
        </button>
        {error && <p className={globalStyles.formError}>{error}</p>}
      </form>
    </div>
  );
};

export default UserAdd;
