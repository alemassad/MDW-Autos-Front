import { useEffect } from "react";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getAutos } from "../../slices/autos";
import Card from "../../components/Card";
import autoreuters from "../../assets/autoreuters.jpg";

const Autos = () => {
  const { lista, loading } = useSelector((state) => state.reducer.autos);

  const dispatch = useDispatch();

  useEffect(() => {
    // Se podría modificar para que no se llame si ya hay autos,
    // pero para el caso de la baja lógica, necesitamos refetchear para ver los cambios.
    dispatch(getAutos());
  }, [dispatch]);

  // Filtra la lista para mostrar solo los autos activos
  const activeAutos = lista.filter(auto => auto.isActive);

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
    
      <h1 className={globalStyles.title}>Vehículos Disponibles</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="cardList">
          {activeAutos.map((auto) => (
            <Card key={auto._id} auto={auto} />
          ))}
        </div>
      )}    
      
    </div>
  );
};

export default Autos;
