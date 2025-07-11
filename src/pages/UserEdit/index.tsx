import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getUserById, editUser, clearEditState } from "../../slices/userEdit";
import { useParams, useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import type { User } from "../../types/user";
import miraAuto from "../../assets/miraAuto.webp";

const UserEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector(
    (state) => state.reducer.userEdit);
   
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    email: "",
    isAdmin: "",
  });

  useEffect(() => {
    if (id) dispatch(getUserById(id));
    return () => {
      dispatch(clearEditState());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        lastname: user.lastname || "",
        birthdate: user.birthdate || "",
        email: user.email || "",
        isAdmin: user.isAdmin ? "true" : "false",        
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const data: Partial<Omit<User, "_id">> = {
      name: form.name,
      lastname: form.lastname,
      birthdate: form.birthdate,
      email: form.email,
      isAdmin: form.isAdmin === "true" ? true : false, // Convert to boolean
    };
    dispatch(editUser({ id, data }));
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
      <h1 className={globalStyles.title}>Modificar Usuario</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="lastname">
          Apellido
        </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={form.lastname}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="birthdate">
          Fecha de Nacimiento
        </label>
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          value={form.birthdate}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="isAdmin">
          Es Admin?
        </label>
        <select
          id="isAdmin"
          name="isAdmin"
          value={form.isAdmin}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        >
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>

        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Modificando..." : "Modificar User"}
        </button>
      </form>
      {error && (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      )}
      {success && (
        <p className={globalStyles.formSuccess} style={{ textAlign: "center" }}>
          {success}
        </p>
      )}
      <button
        className={globalStyles.formButton}
        style={{ marginTop: 16 }}
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
};

export default UserEdit;
