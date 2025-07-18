import { useEffect } from "react";
import globalStyles from "../Pages.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { addAuto, clearAddState } from "../../slices/autoAdd";
import type { Auto } from "../../types/autos";
import joven from "../../assets/joven.avif";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { autoAddSchema } from "./validations";

// Use Omit<Auto, "_id"> directly for form data type

const AutoAdd = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.autoAdd
  );

  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Auto, "_id" | "isActive"> & { category: string }>({
    resolver: joiResolver(autoAddSchema)
  });

  useEffect(() => {
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
      category: data.category,
      isActive: true,
      ownerId: data.ownerId || "",
    };
    dispatch(addAuto(baseData));
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
        {errors.name && <p className={globalStyles.formError}>{errors.name.message}</p>}
        
        <label className={globalStyles.formLabel} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={globalStyles.formInput}
        />
        {errors.description && <p className={globalStyles.formError}>{errors.description.message}</p>}
        
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
        {errors.amount && <p className={globalStyles.formError}>{errors.amount.message}</p>}
        
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
        {errors.price && <p className={globalStyles.formError}>{errors.price.message}</p>}
        
        <label className={globalStyles.formLabel} htmlFor="ownerId">
          Propietario (opcional)
        </label>
        <input
          id="ownerId"
          {...register("ownerId")}
          type="text"
          className={globalStyles.formInput}
        />
        
        <label className={globalStyles.formLabel} htmlFor="image">
          Imagen (URL opcional)
        </label>
        <input
          id="image"
          {...register("image")}
          type="text"
          className={globalStyles.formInput}
        />
        
        <label className={globalStyles.formLabel} htmlFor="category">
          Categoría (ID)
        </label>
        <input
          id="category"
          {...register("category")}
          type="text"
          className={globalStyles.formInput}
        />
        {"category" in errors && <p className={globalStyles.formError}>{errors.category?.message}</p>}
        
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
