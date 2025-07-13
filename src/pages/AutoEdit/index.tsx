import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getAutoById, editAuto, clearEditState } from "../../slices/autoEdit";
import { useParams, useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import type { Auto } from "../../types/autos";
import miraAuto from "../../assets/miraAuto.webp";

const AutoEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auto, loading, error, success } = useSelector((state) => state.reducer.autoEdit);
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    price: "",
    image: "",
    ownerId: "",
    isActive: true, // Añadido para controlar el estado
  });

  useEffect(() => {
    if (id) dispatch(getAutoById(id));
    return () => { dispatch(clearEditState()); };
  }, [id, dispatch]);

  useEffect(() => {
    if (auto) {
      setForm({
        name: auto.name || "",
        description: auto.description || "",
        amount: auto.amount?.toString() || "",
        price: auto.price?.toString() || "",
        image: auto.image || "",
        ownerId: auto.ownerId || "",
        isActive: auto.isActive === undefined ? true : auto.isActive,
      });
    }
  }, [auto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const data: Partial<Omit<Auto, "_id">> = {
      name: form.name,
      description: form.description,
      amount: Number(form.amount),
      price: Number(form.price),
      image: form.image,
      ownerId: form.ownerId,
      isActive: form.isActive,
    };
    dispatch(editAuto({ id, data }));
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
      <h1 className={globalStyles.title}>Modificar Auto</h1>
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
        <label className={globalStyles.formLabel} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="amount">
          Stock
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className={globalStyles.formInput}
          min={0}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="price">
          Precio (u$s)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className={globalStyles.formInput}
          min={0}
          required
        />
        <label className={globalStyles.formLabel} htmlFor="ownerId">
          Propietario (opcional)
        </label>
        <input
          id="ownerId"
          name="ownerId"
          type="text"
          value={form.ownerId}
          onChange={handleChange}
          className={globalStyles.formInput}
        />
        <label className={globalStyles.formLabel} htmlFor="image">
          Imagen (URL opcional)
        </label>
        <input
          id="image"
          name="image"
          type="text"
          value={form.image}
          onChange={handleChange}
          className={globalStyles.formInput}
        />
        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
            style={{ marginRight: '0.5rem' }}
          />
          <label className={globalStyles.formLabel} htmlFor="isActive">
            Activo
          </label>
        </div>       
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Modificando..." : "Modificar Auto"}
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

export default AutoEdit;
