import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { deleteUserById, clearDeleteState } from "../../slices/userDelete";
import deleteAuto from "../../assets/Eliminacion-autos.jpg";

const UserDelete = () => {
  const [inputId, setInputId] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.userDelete
  );

  useEffect(() => {
    return () => {
      dispatch(clearDeleteState());
    };
  }, [dispatch]);

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearDeleteState());
    if (!inputId.trim()) return;
    dispatch(deleteUserById(inputId.trim()));
    setInputId("");
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${deleteAuto})`,
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
      <h1 className={globalStyles.title}>Eliminar Usuario por ID</h1>
      <form onSubmit={handleDelete} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="userId">
          ID del Usuario
        </label>
        <input
          id="userId"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Ingrese el _id del usuario"
          className={globalStyles.formInput}
        />
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
        {success && (
          <p className={globalStyles.formError} style={{ color: "#22c55e" }}>
            {success}
          </p>
        )}
        {error && <p className={globalStyles.formError}>{error}</p>}
      </form>
    </div>
  );
};

export default UserDelete;
