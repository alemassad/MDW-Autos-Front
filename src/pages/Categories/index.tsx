import { useEffect } from "react";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getCategories } from "../../slices/categories";
import autoreuters from "../../assets/autoreuters.jpg";
import CardCategory from "../../components/CardCategoty";

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
        backgroundSize: "cover"
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
