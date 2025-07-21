import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getAutoById, editAuto, clearEditState } from "../../slices/autoEdit";
import { getCategories } from "../../slices/categories";
import { getUsers } from "../../slices/users";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { autoEditSchema } from "./validations";
import globalStyles from "../Pages.module.css";
import type { Auto } from "../../types/autos";
import miraAuto from "../../assets/miraAuto.webp";

const AutoEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auto, loading, error, success } = useSelector((state) => state.reducer.autoEdit);
  const { lista: categorias, loading: loadingCategorias } = useSelector(
    (state) => state.reducer.categories
  );
  const { lista: users, loading: loadingUsers } = useSelector(
    (state) => state.reducer.users
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Auto, "_id"> & { category: string }>({
    resolver: joiResolver(autoEditSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
      price: 0,
      image: "",
      ownerId: "",
      isActive: true,
      category: "",
    },
  });

  useEffect(() => {
    if (id) dispatch(getAutoById(id));
    dispatch(getCategories());
    dispatch(getUsers());
    return () => { dispatch(clearEditState()); };
  }, [id, dispatch]);
  
  useEffect(() => {
    if (auto) {
      reset({
        name: auto.name || "",
        description: auto.description || "",
        amount: auto.amount ?? "",
        price: auto.price ?? "",
        image: auto.image || "",
        ownerId: auto.ownerId || "",
        isActive: auto.isActive === undefined ? true : auto.isActive,
        category: auto.category || "",
      });
    }
  }, [auto, reset]);
  const onSubmit = (data: Omit<Auto, "_id"> & { category: string }) => {
    if (!id) return;
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
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          className={globalStyles.formInput}
        />
        {errors.name && <span className={globalStyles.formError}>{errors.name.message}</span>}

        <label className={globalStyles.formLabel} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={globalStyles.formInput}
        />
        {errors.description && <span className={globalStyles.formError}>{errors.description.message}</span>}

        <label className={globalStyles.formLabel} htmlFor="amount">
          Stock
        </label>
        <input
          id="amount"
          {...register("amount")}
          type="number"
          className={globalStyles.formInput}
          min={0}
        />
        {errors.amount && <span className={globalStyles.formError}>{errors.amount.message}</span>}

        <label className={globalStyles.formLabel} htmlFor="price">
          Precio (u$s)
        </label>
        <input
          id="price"
          {...register("price")}
          type="number"
          className={globalStyles.formInput}
          min={0}
        />
        {errors.price && <span className={globalStyles.formError}>{errors.price.message}</span>}

        <label className={globalStyles.formLabel} htmlFor="ownerId">
          Propietario (opcional)
        </label>
        <select
          id="ownerId"
          {...register("ownerId")}
          className={globalStyles.formInput}
          disabled={loadingUsers}
        >
          <option value="">Sin propietario</option>
          {users
            .filter((user) => user.isActive)
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} {user.lastname}
              </option>
            ))}
        </select>
        {errors.ownerId && <span className={globalStyles.formError}>{errors.ownerId.message}</span>}

        <label className={globalStyles.formLabel} htmlFor="category">
          Categoría
        </label>
        <select
          id="category"
          {...register("category")}
          className={globalStyles.formInput}
          disabled={loadingCategorias}
        >
          <option value="">Sin categoría</option>
          {categorias
            .filter((cat) => cat.isActive)
            .map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.category && <span className={globalStyles.formError}>{errors.category.message}</span>}

        <label className={globalStyles.formLabel} htmlFor="image">
          Imagen (URL opcional)
        </label>
        <input
          id="image"
          {...register("image")}
          type="text"
          className={globalStyles.formInput}
        />
        {errors.image && <span className={globalStyles.formError}>{errors.image.message}</span>}

        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
          <input
            id="isActive"
            {...register("isActive")}
            type="checkbox"
            className={globalStyles.formCheckbox}
          />
          <label className={globalStyles.formLabel} htmlFor="isActive" style={{ marginLeft: 8 }}>
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
        {loading && <div className={globalStyles.spinner}></div>}
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
