import { useEffect } from "react";
import "../../App.css";
import globalStyles from "../Pages.module.css"; // Importa tus estilos globales
import { useSelector, useDispatch } from "../../store/store";
import { getCategories } from "../../slices/categories";
import autoreuters from "../../assets/autoreuters.jpg";
import CardCategory from "../../components/CardCategoty"; // Asegúrate de que la ruta sea correcta

const Categories = () => {
  const { lista, loading } = useSelector((state) => state.reducer.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const activeCategories = lista.filter((categories) => categories.isActive);

  return (
    <div
      className={globalStyles.container}
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
      }}
    >
      <h1 className={globalStyles.title}>Categorías de Vehículos</h1>

      {loading ? (
        <div className={globalStyles.spinner}></div>
      ) : (
        <div className="cardList">
          {activeCategories.map((categories) => (
            <CardCategory key={categories._id} category={categories} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
