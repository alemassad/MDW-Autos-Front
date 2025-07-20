import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import {
  getCategoryById,
  editCategory,
  clearEditState,
} from "../../slices/categoryEdit";
import { useParams, useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import categoryImage from "../../assets/autoreuters.jpg";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { categoryEditSchema } from "./validations";

type FormData = {
  name: string;
  description: string;
  isActive: boolean;
};

const CategoryEdit = () => {  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, loading, error, success } = useSelector(
    (state) => state.reducer.categoryEdit
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(categoryEditSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (id) dispatch(getCategoryById(id));
    return () => {
      dispatch(clearEditState());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (category) {
      reset({
        name: category.name || "",
        description: category.description || "",
        isActive: typeof category.isActive === "boolean" ? category.isActive : true,
      });
    }
  }, [category, reset]);

  const onSubmit = (data: FormData) => {
    console.log("SUBMIT DATA", data);
    if (!id) return;
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
      }}
    >
      <h1 className={globalStyles.title}>Modificar Categoría</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre de la Categoría
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          className={globalStyles.formInput}
          required
        />
        {errors.name && (
          <span className={globalStyles.formError}>{errors.name.message}</span>
        )}

        <label className={globalStyles.formLabel} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={globalStyles.formInput}
          required
        />
        {errors.description && (
          <span className={globalStyles.formError}>
            {errors.description.message}
          </span>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.5rem 0",
          }}
        >
          <input
            id="isActive"
            {...register("isActive")}
            type="checkbox"
            className={globalStyles.formCheckbox}
          />
          <label className={globalStyles.formLabel} htmlFor="isActive">
            ¿Categoría Activa?
          </label>
        </div>
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Modificando..." : "Modificar Categoría"}
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

export default CategoryEdit;
