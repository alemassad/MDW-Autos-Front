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
    dispatch(getAutos());
  }, [dispatch]);

    const activeAutos = lista.filter(auto => auto.isActive);

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${autoreuters})`,
        backgroundSize: "cover"
      }}>
    
      <h1 className={globalStyles.title}>Vehículos Disponibles</h1>

      {loading ? (
        <div className={globalStyles.spinner}></div>
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
