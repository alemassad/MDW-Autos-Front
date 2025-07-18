import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { deleteUserById, clearDeleteState } from "../../slices/userDelete";
import deleteAuto from "../../assets/Eliminacion-autos.jpg";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { idSchema } from "./validations";
import { getUsers } from "../../slices/users";

type FormValues = {
  id: string;
};

const UserDelete = () => {
  const [isLogical, setIsLogical] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.userDelete
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormValues>({
    resolver: joiResolver(idSchema),
  });

  useEffect(() => {
    return () => {
      dispatch(clearDeleteState());
    };
  }, [dispatch]);

  const handleOpenModal = (data: FormValues) => {
    if (!data.id.trim()) return;
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(clearDeleteState());
    const id = getValues("id").trim();
    dispatch(deleteUserById({ id, isLogical }));
    dispatch(getUsers());
    reset();
    setIsModalOpen(false);
  };
  return (
    <>
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
        <form onSubmit={handleSubmit(handleOpenModal)} className={globalStyles.formAuto}>
          <label className={globalStyles.formLabel} htmlFor="id">
            ID del Usuario
          </label>
          <input
            id="id"
            type="text"
            {...register("id")}
            placeholder="Ingrese el ID del usuario"
            className={globalStyles.formInput}
          />
          {errors.id && (
            <p className={globalStyles.formError}>{errors.id.message}</p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              id="logicalDelete"
              checked={isLogical}
              onChange={(e) => setIsLogical(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
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
        <p>¿Estás seguro de ELIMINAR el usuario?</p>
        <p><strong>Tipo de baja:</strong> {isLogical ? 'Lógica' : 'Física'}</p>
      </Modal>
    </>
  );
};

export default UserDelete;
