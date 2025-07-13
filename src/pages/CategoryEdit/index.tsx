// File: src/pages/CategoryEdit/index.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getCategoryById, editCategory, clearEditState } from "../../slices/categoryEdit"; // Importa el nuevo slice
import { useParams, useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import type { Category } from "../../types/category";
import categoryImage from "../../assets/autoreuters.jpg"; // Puedes usar una imagen relevante para categorías

const CategoryEdit = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { category, loading, error, success } = useSelector(
    (state) => state.reducer.categoryEdit
  );

    const [form, setForm] = useState<Omit<Category, "_id" | "cars">>({
    name: "",
    description: "",
    isActive: true,
  });

 
  useEffect(() => {
    if (id) {
      dispatch(getCategoryById(id));
    }
    return () => {
      dispatch(clearEditState());
    };
  }, [id, dispatch]);

  // Efecto para poblar el formulario cuando la categoría se carga
  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        isActive: category.isActive === undefined ? true : category.isActive,
      });
    }
  }, [category]);

  // Manejador de cambios para los inputs del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm({ ...form, [name]: newValue });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return; // Asegura que hay un ID para editar

    // Validación básica de campos
    if (!form.name.trim() || !form.description.trim()) {
      // Podrías despachar un error local o mostrar un mensaje al usuario
      console.error("Nombre y descripción son obligatorios.");
      return;
    }

    // Despacha la acción para modificar la categoría
    const data: Partial<Omit<Category, "_id" | "cars"| "isActive">> = {
      name: form.name,
      description: form.description,
      //isActive: form.isActive,
    };
    dispatch(editCategory({ id, data }));
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
        padding: "20px",
      }}
    >
      <h1 className={globalStyles.title}>Modificar Categoría</h1>
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
          {loading ? "Modificando..." : "Modificar Categoría"}
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

      <button
        className={globalStyles.formButton}
        style={{ marginTop: 16 }}
        onClick={() => navigate(-1)} // Botón para volver a la página anterior
      >
        Volver
      </button>
    </div>
  );
};

export default CategoryEdit;
