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
    //category: "",
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
        //category: ("category" in auto ? (auto as unknown as { category?: string }).category || "" : ""),
      });
    }
  }, [auto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
       {/*  <label className={globalStyles.formLabel} htmlFor="category">
          Categoría (ID)
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          className={globalStyles.formInput}
          required
        /> */}
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
