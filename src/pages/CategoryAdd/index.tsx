// File: src/pages/CategoryAdd/index.tsx
import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css"; // Reutiliza los estilos globales
import { useDispatch, useSelector } from "../../store/store";
import { addCategory, clearAddState } from "../../slices/categoryAdd"; // Importa el nuevo slice
import type { Category } from "../../types/category" // Importa el tipo Category
import categoryImage from "../../assets/autoreuters.jpg"; // Puedes usar una imagen relevante para categorías

const CategoryAdd = () => {
  // Estado local para los campos del formulario de categoría
  const [form, setForm] = useState<Omit<Category, "_id" | "cars">>({
    name: "",
    description: "",
    isActive: true,
  });

  const dispatch = useDispatch();
  // Selecciona el estado relevante del nuevo slice categoryAdd
  const { loading, success, error } = useSelector(
    (state) => state.reducer.categoryAdd
  );

  // Limpia el estado de éxito/error al desmontar el componente
  useEffect(() => {
    return () => {
      dispatch(clearAddState());
    };
  }, [dispatch]);

  // Manejador de cambios para los inputs del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAddState()); // Limpia cualquier estado previo antes de un nuevo envío

    // Validación básica de campos
    if (!form.name.trim() || !form.description.trim()) {
      // Podrías despachar un error local o mostrar un mensaje al usuario
      console.error("Nombre y descripción son obligatorios.");
      return;
    }

    // Despacha la acción para agregar la categoría
    dispatch(addCategory(form));

    // Reinicia el formulario después del envío
    setForm({
      name: "",
      description: "",
      isActive: true,
    });
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${categoryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px", // Añadido para mejor espaciado en pantallas pequeñas
      }}
    >
      <h1 className={globalStyles.title}>Agregar Nueva Categoría</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre de la Categoría
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
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading} // Deshabilita el botón mientras se carga
        >
          {loading ? "Agregando..." : "Agregar Categoría"}
        </button>
      </form>

      {/* Muestra mensajes de error o éxito */}
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
    </div>
  );
};

export default CategoryAdd;
