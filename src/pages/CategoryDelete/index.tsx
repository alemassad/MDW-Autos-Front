// File: src/pages/CategoryDelete/index.tsx
import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css"; // Reutiliza los estilos globales
import { useDispatch, useSelector } from "../../store/store";
import { deleteCategoryById, clearDeleteState } from "../../slices/categoryDelete"; // Importa el nuevo slice
import categoryImage from "../../assets/autoreuters.jpg"; // Puedes usar una imagen relevante para categorías
import Modal from "../../components/Modal";

const CategoryDelete = () => {
  const [inputId, setInputId] = useState("");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogical, setIsLogical] = useState(true);
  // Selecciona el estado relevante del nuevo slice categoryDelete
  const { loading, success, error } = useSelector(
    (state) => state.reducer.categoryDelete
  );

   useEffect(() => {
      return () => {
        dispatch(clearDeleteState());
      };
    }, [dispatch]);
  
    const handleOpenModal = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputId.trim()) return;
      setIsModalOpen(true);
    };
  
    const handleConfirmDelete = () => {
      dispatch(clearDeleteState());
      dispatch(deleteCategoryById({ id: inputId.trim(), isLogical }));
      setInputId("");
      setIsModalOpen(false);
    };

  return (
    <>
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
      <form onSubmit={handleOpenModal} className={globalStyles.formAuto}>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
          >
          <input
            type="checkbox"
            id="logicalDelete"
            checked={isLogical}
            onChange={(e) => setIsLogical(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
            />
          <label htmlFor="logicalDelete" className={globalStyles.formLabel}>
            Baja lógica
          </label>
        </div>
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
          >
          {loading ? "Procesando..." : "Eliminar"}
        </button>
        {success && (
          <p className={globalStyles.formError} style={{ color: "#22c55e" }}>
            {success}
          </p>
        )}
        {error && <p className={globalStyles.formError}>{error}</p>}
      </form>
   
    </div>
    <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Operación"
        >
        <p>¿Estás seguro de que deseas realizar esta acción?</p>
        <p><strong>Tipo de baja:</strong> {isLogical ? 'Lógica' : 'Física'}</p>
      </Modal>
        </>
  );
};

export default CategoryDelete;
