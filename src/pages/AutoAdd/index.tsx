import { useEffect } from "react";
import globalStyles from "../Pages.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { addAuto, clearAddState } from "../../slices/autoAdd";
import { getCategories } from "../../slices/categories";
import { getUsers } from "../../slices/users";
import type { Auto } from "../../types/autos";
import joven from "../../assets/joven.avif";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { autoAddSchema } from "./validations";

const AutoAdd = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.autoAdd
  );
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
  } = useForm<Omit<Auto, "_id" | "isActive"> & { category: string }>({
    resolver: joiResolver(autoAddSchema),
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsers());
    return () => {
      dispatch(clearAddState());
    };
  }, [dispatch]);

  const onSubmit = (data: Omit<Auto, "_id"> & { category: string }) => {
    dispatch(clearAddState());
    const baseData: Omit<Auto, "_id"> & { category: string } = {
      name: data.name,
      description: data.description,
      amount: Number(data.amount),
      price: Number(data.price),
      image: data.image,
      category: data.category || "",
      ownerId: data.ownerId || "",
    };
    dispatch(addAuto(baseData));
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${joven})`,
        backgroundSize: "cover"
      }}
    >
      <h1 className={globalStyles.title}>Agregar Auto</h1>
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
        {errors.name && (
          <p className={globalStyles.formError}>{errors.name.message}</p>
        )}

        <label className={globalStyles.formLabel} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={globalStyles.formInput}
        />
        {errors.description && (
          <p className={globalStyles.formError}>{errors.description.message}</p>
        )}

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
        {errors.amount && (
          <p className={globalStyles.formError}>{errors.amount.message}</p>
        )}

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
        {errors.price && (
          <p className={globalStyles.formError}>{errors.price.message}</p>
        )}

        <label className={globalStyles.formLabel} htmlFor="ownerId">
          Propietario (opcional)
        </label>
        <select
          id="ownerId"
          {...register("ownerId")}
          className={globalStyles.formInput}
          disabled={loadingUsers}
        >
          <option value="">Propietario?</option>
          {users
            .filter((user) => user.isActive)
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} {user.lastname}
              </option>
            ))}
        </select>
        {errors.ownerId && (
          <p className={globalStyles.formError}>{errors.ownerId.message}</p>
        )}

        <label className={globalStyles.formLabel} htmlFor="image">
          Imagen (URL opcional)
        </label>
        <input
          id="image"
          {...register("image")}
          type="text"
          className={globalStyles.formInput}
        />
        {errors.image && (
          <p className={globalStyles.formError}>{errors.image.message}</p>
        )}

        <label className={globalStyles.formLabel} htmlFor="category">
          Categoría
        </label>
        <select
          id="category"
          {...register("category")}
          className={globalStyles.formInput}
          disabled={loadingCategorias}
        >
          <option value="">Categoría?</option>
          {categorias
            .filter((cat) => cat.isActive)
            .map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <p className={globalStyles.formError}>{errors.category.message}</p>
        )}

        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Auto"}
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
          ¡Auto agregado exitosamente!
        </p>
      )}
    </div>
  );
};

export default AutoAdd;
