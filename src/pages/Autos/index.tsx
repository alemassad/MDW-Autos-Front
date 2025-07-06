import { useEffect } from "react";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getAutos } from "../../slices/autos";
import Card from "../../components/Card";
import autoreuters from "../../assets/autoreuters.jpg";

const Automotores = () => {
  const { lista, loading } = useSelector((state) => state.reducer.autos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!lista.length) {
      dispatch(getAutos());
    }
  }, [dispatch, lista]);

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
      }}>
    
      <h1 className={globalStyles.title}>Veículos</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="cardList">
          {lista.map((auto) => (
            <Card key={auto._id} auto={auto} />
          ))}
        </div>
      )}    
      
    </div>
  );
};

export default Automotores;
