// Ejemplo para Home/index.tsx
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={globalStyles.container}>
      <h1 className={globalStyles.title}>
        Bienvenido a nuestra agencia de Atomotores
      </h1>
      <p className={globalStyles.description}>
        Descubrí nuestra amplia variedad de vehículos y encontrá el auto
        perfecto para vos. Ya sea que busques un 0 km, un usado en excelente
        estado o simplemente quieras explorar nuestro catálogo, tenemos opciones
        para todos los gustos y necesidades. ¡Comenzá hoy tu experiencia con
        Automotores MDW!
      </p>
      <button
        className={globalStyles.button}
        onClick={() => navigate("/")}
      >
        Go to Autos
      </button>
      <button
        className={`${globalStyles.button} ${globalStyles.buttonGreen}`}
        onClick={() => navigate("/about")}
      >
        Go to About
      </button>
    </div>
  );
};
export default Home;
