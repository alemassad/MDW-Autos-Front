import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { addAuto, clearAddState } from "../../slices/autoAdd";
import type { Auto } from "../../types/autos";
import joven from "../../assets/joven.avif";

const AutoAdd = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    price: "",
    image: "",
    isActive: true,
    ownerId: "",
    category: "",
  });
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.autoAdd
  );

  useEffect(() => {
    return () => {
      dispatch(clearAddState());
    };
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAddState());
    if (
      !form.name ||
      !form.description ||
      !form.amount ||
      !form.price ||
      !form.category
    )
      return;
    const baseData = {
      name: form.name,
      description: form.description,
      amount: Number(form.amount),
      price: Number(form.price),
      image: form.image,
      category: form.category,
      isActive: true,
    };
    if (form.ownerId) {
      dispatch(
        addAuto({ ...baseData, ownerId: form.ownerId } as Omit<Auto, "_id"> & {
          category: string;
        })
      );
    } else {
      dispatch(addAuto(baseData as Omit<Auto, "_id"> & { category: string }));
    }
    setForm({
      name: "",
      description: "",
      amount: "",
      price: "",
      image: "",
      isActive: true,
      ownerId: "",
      category: "",
    });
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${joven})`,
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
      <h1 className={globalStyles.title}>Agregar Auto</h1>
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
        <label className={globalStyles.formLabel} htmlFor="category">
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
        />
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Auto"}
        </button>
      </form>

      {error && (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      )}
      {success && (
        <p className={globalStyles.formSuccess} style={{ textAlign: "center" }}>
          ¡Auto agregado exitosamente!
        </p>
      )}
    </div>
  );
};

export default AutoAdd;
