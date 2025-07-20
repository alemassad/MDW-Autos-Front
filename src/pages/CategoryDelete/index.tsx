import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css"; 
import { useDispatch, useSelector } from "../../store/store";
import { deleteCategoryById, clearDeleteState } from "../../slices/categoryDelete"; 
import categoryImage from "../../assets/autoreuters.jpg"; // Puedes usar una imagen relevante para categorías
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { categoryIdSchema } from "./validations";

const CategoryDelete = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogical, setIsLogical] = useState(true);
  const { loading, success, error } = useSelector(
    (state) => state.reducer.categoryDelete
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<{ categoryId: string }>({
    resolver: joiResolver(categoryIdSchema),
    defaultValues: { categoryId: "" },
  });

  useEffect(() => {
    return () => {
      dispatch(clearDeleteState());
    };
  }, [dispatch]);

  const handleOpenModal = (data: { categoryId: string }) => {
    if (!data.categoryId.trim()) return;
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(clearDeleteState());
    const id = getValues("categoryId").trim();
    dispatch(deleteCategoryById({ id, isLogical }));
    reset();
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
        <form
          onSubmit={handleSubmit(handleOpenModal)}
          className={globalStyles.formAuto}
        >
          <label className={globalStyles.formLabel} htmlFor="categoryId">
            ID de la Categoría
          </label>
          <input
            id="categoryId"
            type="text"
            {...register("categoryId")}
            placeholder="Ingrese el _id de la categoría"
            className={globalStyles.formInput}
          />
          {errors.categoryId && (
            <p className={globalStyles.formError}>
              {errors.categoryId.message}
            </p>
          )}
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
          {loading && <div className={globalStyles.spinner}></div>}
          {success && (
            <p className={globalStyles.formSuccess}>
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
        title="Confirmar Baja"
      >
        <p>¿Estás seguro de que deseas realizar este Borrado?</p>
        <p>
          <strong>Tipo de baja:</strong> {isLogical ? "Lógica" : "Física"}
        </p>
      </Modal>
    </>
  );
};

export default CategoryDelete;
