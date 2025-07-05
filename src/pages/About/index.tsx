//import { useEffect } from "react";
import "../../App.css";
//import { useDispatch, useSelector } from "../../store/store";
import globalStyles from "../Pages.module.css";
//import { getAutos } from "../../slices/autos";

const About = () => {
 // const { lista, loading } = useSelector((state) => state.reducer.autos);
 /*  const dispatch = useDispatch();
  useEffect(() => {
    if (!lista.length) {
      dispatch(getAutos());
    }
  }, [dispatch, lista]); */

  return (
    <>
      <h1 className={globalStyles.title}>Acerca de nosotros</h1>

      
        <div className={globalStyles.spinner}></div>
      
        <div>
          <p className={globalStyles.description}>
            ¡Bienvenido a nuestra concesionaria de automotores! Nos
            especializamos en ofrecerte la mejor selección de vehículos nuevos y
            usados, con atención personalizada y asesoramiento profesional.
            Nuestro objetivo es ayudarte a encontrar el auto ideal que se adapte
            a tus necesidades y presupuesto, brindándote confianza y seguridad
            en cada paso del proceso. ¡Visítanos y descubrí por qué somos tu
            mejor opción!
          </p>        
        </div>
      
    </>
  );
};
export default About;
