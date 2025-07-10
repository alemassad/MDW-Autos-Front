// File: src/pages/CategoryDelete/index.tsx
import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css"; // Reutiliza los estilos globales
import { useDispatch, useSelector } from "../../store/store";
import { deleteCategoryById, clearDeleteState } from "../../slices/categoryDelete"; // Importa el nuevo slice
import categoryImage from "../../assets/autoreuters.jpg"; // Puedes usar una imagen relevante para categorías

const CategoryDelete = () => {
  const [inputId, setInputId] = useState("");
  const dispatch = useDispatch();
  // Selecciona el estado relevante del nuevo slice categoryDelete
  const { loading, success, error } = useSelector(
    (state) => state.reducer.categoryDelete
  );

  // Limpia el estado de éxito/error al desmontar el componente
  useEffect(() => {
    return () => {
      dispatch(clearDeleteState());
    };
  }, [dispatch]);

  // Manejador de envío del formulario
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearDeleteState()); // Limpia cualquier estado previo antes de un nuevo envío

    if (!inputId.trim()) {
      // Podrías despachar un error local o mostrar un mensaje al usuario
      console.error("El ID de la categoría es obligatorio.");
      return;
    }

    // Despacha la acción para eliminar la categoría
    dispatch(deleteCategoryById(inputId.trim()));
    setInputId(""); // Limpia el input después del envío
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
      <h1 className={globalStyles.title}>Eliminar Categoría por ID</h1>
      <form onSubmit={handleDelete} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="categoryId">
          ID de la Categoría
        </label>
        <input
          id="categoryId"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Ingrese el _id de la categoría"
          className={globalStyles.formInput}
          required
        />
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading} // Deshabilita el botón mientras se carga
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
      </form>

      {/* Muestra mensajes de error o éxito */}
      {success && (
        <p className={globalStyles.formError} style={{ color: "#22c55e" }}>
          {success}
        </p>
      )}
      {error && <p className={globalStyles.formError}>{error}</p>}
    </div>
  );
};

export default CategoryDelete;
