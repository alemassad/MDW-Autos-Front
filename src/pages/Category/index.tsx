// File: src/pages/Category/index.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import "../../App.css"; // Mantén tus estilos globales si los usas
import globalStyles from "../Pages.module.css"; // Reutiliza los estilos modulares de Pages
import { useSelector, useDispatch } from "../../store/store";
import { getCategoryById, clearCategory } from "../../slices/categories"; // Importa el nuevo thunk y el reducer
import autoreuters from "../../assets/autoreuters.jpg"; // Puedes usar una imagen existente o añadir una nueva
import categoryIdSchema from "./validations"; // Importa el esquema de validación

type FormValues = { categoryId: string };

const CategoryPage = () => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector((state) => state.reducer.categories);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: joiResolver(categoryIdSchema),
    defaultValues: { categoryId: paramId || "" },
  });

  useEffect(() => {
    if (paramId) {
      setValue("categoryId", paramId);
      dispatch(getCategoryById(paramId));
    } else {
      dispatch(clearCategory());
    }
    return () => {
      dispatch(clearCategory());
    };
  }, [paramId, dispatch, setValue]);

  const onSubmit = (data: FormValues) => {
    if (data.categoryId.trim()) {
      navigate(`/categories/${data.categoryId.trim()}`);
    }
  };

  return (
    <div className={globalStyles.container} 
      style={{
        backgroundImage: `url(${autoreuters})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
      <h1 className={globalStyles.title}>Buscar Categoría por ID</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}> 
        <label className={globalStyles.formLabel} htmlFor="categoryId">
          ID de la Categoría
        </label>
        <input
          id="categoryId"
          type="text"
          {...register("categoryId")}
          placeholder="Ingresar Id"
          className={globalStyles.formInput}
        />
        {errors.categoryId && (
          <p className={globalStyles.formError}>{errors.categoryId.message}</p>
        )}
        <button type="submit" className={globalStyles.formButton}>
          Buscar
        </button>
      </form>
      {loading ? (
        <div className={globalStyles.spinner}></div> 
      ) : error ? (
        <p className={globalStyles.formError}>
          {error}
        </p>
      ) : category ? (
        category.isActive ? (
          <div className={globalStyles.formAuto} style={{ marginTop: "2rem" }}>
            <h2 style={{ textAlign: "center" }}>{category.name}</h2>
            <p>
              <b>ID:</b> {category._id}
            </p>
            <p>
              <b>Descripción:</b> {category.description}
            </p>
            {category.cars && category.cars.length > 0 ? (
              <div>
                <p><b>Coches asociados:</b></p>
                <ul>
                  {category.cars.map((car) => (
                    <li key={car._id}>
                      {car.name} (ID: {car._id}) - Precio: u$s {car.price}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p><b>Coches asociados:</b> Ninguno</p>
            )}
          </div>
        ) : (
          <p className={globalStyles.formError} style={{ textAlign: "center" }}>
            La categoría no está activa o no se encuentra disponible.
          </p>
        )
      ) : null}
    
    </div>
  );
};

export default CategoryPage;
