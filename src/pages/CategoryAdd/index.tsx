import { useEffect } from "react";
import globalStyles from "../Pages.module.css"; 
import { useDispatch, useSelector } from "../../store/store";
import { addCategory, clearAddState } from "../../slices/categoryAdd"; 
import categoryImage from "../../assets/autoreuters.jpg";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { categoryAddSchema } from "./validations";

const CategoryAdd = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.reducer.categoryAdd
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; description: string; isActive?: boolean }>({
    resolver: joiResolver(categoryAddSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearAddState());
    };
  }, [dispatch]);

  const onSubmit = (data: {
    name: string;
    description: string;
    isActive?: boolean;
  }) => {
    dispatch(clearAddState());
    dispatch(addCategory(data));
    reset();
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${categoryImage})`,
        backgroundSize: "cover"
      }}
    >
      <h1 className={globalStyles.title}>Agregar Nueva Categoría</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre de la Categoría
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <input
            id="isActive"
            {...register("isActive")}
            type="checkbox"
            defaultChecked={true}
            className={globalStyles.formCheckbox}
          />
          <label
            className={globalStyles.formLabel}
            htmlFor="isActive"
          >
            ¿Categoría activa?
          </label>
        </div>

        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Categoría"}
        </button>
        {loading && <div className={globalStyles.spinner}></div>}
      </form>
      {error && <p className={globalStyles.formError}>{error}</p>}
      {success && <p className={globalStyles.formSuccess}>{success}</p>}
    </div>
  );
};

export default CategoryAdd;
