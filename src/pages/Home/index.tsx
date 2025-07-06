import globalStyles from "../Pages.module.css";
import automotores from "../../assets/automotores.jpg";

const Home = () => {

  return (
    <>
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
            
      <img
        src={automotores}
        alt="Imagen de automotores"
        className={globalStyles.image}
      />
    </>
  );
};
export default Home;
