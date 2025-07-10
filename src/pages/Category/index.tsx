// File: src/pages/Category/index.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css"; // Mantén tus estilos globales si los usas
import globalStyles from "../Pages.module.css"; // Reutiliza los estilos modulares de Pages
import { useSelector, useDispatch } from "../../store/store";
import { getCategoryById, clearCategory } from "../../slices/categories"; // Importa el nuevo thunk y el reducer
import autoreuters from "../../assets/autoreuters.jpg"; // Puedes usar una imagen existente o añadir una nueva

const CategoryPage = () => { // Renombrado a CategoryPage para evitar conflictos con el tipo Category
  const { id: paramId } = useParams();
  const [inputId, setInputId] = useState<string>(paramId || "");
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector((state) => state.reducer.categories);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramId) {
      setInputId(paramId);
      dispatch(getCategoryById(paramId));
    } else {
      dispatch(clearCategory());
    }
  }, [paramId, dispatch]);

    // Limpia la categoría al desmontar el componente o al cambiar de ID
  useEffect(() => {
    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      navigate(`/categories/${inputId.trim()}`); // Navega a la URL de la categoría específica
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
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}> 
        <label className={globalStyles.formLabel} htmlFor="categoryId">
          ID de la Categoría
        </label>
        <input
          id="categoryId"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Ingresar Id"
          className={globalStyles.formInput}
        />
        <button type="submit" className={globalStyles.formButton}>
          Buscar
        </button>
      </form>
      {loading ? (
        <div className={globalStyles.spinner}></div> 
      ) : error ? (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      ) : category ? (
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
      ) : null}
    
    </div>
  );
};

export default CategoryPage;
