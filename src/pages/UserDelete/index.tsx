import { useState, useEffect } from "react";
import globalStyles from "../Pages.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { deleteUserById, clearDeleteState } from "../../slices/userDelete";
import deleteAuto from "../../assets/Eliminacion-autos.jpg";
import Modal from "../../components/Modal";

const UserDelete = () => {
  const [inputId, setInputId] = useState("");
  const [isLogical, setIsLogical] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.userDelete
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
    dispatch(deleteUserById({ id: inputId.trim(), isLogical }));
    setInputId("");
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
        <form onSubmit={handleOpenModal} className={globalStyles.formAuto}>
          <label className={globalStyles.formLabel} htmlFor="userId">
            ID del Usuario
          </label>
          <input
            id="userId"
            type="text"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Ingrese el _id del usuario"
            className={globalStyles.formInput}
          />
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
        <p>¿Estás seguro de que deseas realizar esta acción?</p>
        <p><strong>Tipo de baja:</strong> {isLogical ? 'Lógica' : 'Física'}</p>
      </Modal>
    </>
  );
};

export default UserDelete;
