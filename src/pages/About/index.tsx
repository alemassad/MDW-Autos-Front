import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className={globalStyles.title}>Acerca de nosotros</h1>
      <p className={globalStyles.description}>
        ¡Bienvenido a nuestra concesionaria de automotores! Nos especializamos en
        ofrecerte la mejor selección de vehículos nuevos y usados, con
        atención personalizada y asesoramiento profesional. Nuestro objetivo es
        ayudarte a encontrar el auto ideal que se adapte a tus necesidades y
        presupuesto, brindándote confianza y seguridad en cada paso del proceso.
        ¡Visítanos y descubrí por qué somos tu mejor opción!
      </p>
      <button className={globalStyles.button} onClick={() => navigate("/autos")}>
        Go to Autos
      </button>
      <button
        className={`${globalStyles.button} ${globalStyles.buttonGreen}`}
        onClick={() => navigate("/about")}
      >
        Go to About
      </button>
      <button
        className={`${globalStyles.button} ${globalStyles.buttonBlue}`}
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
      <button
        className={`${globalStyles.button} ${globalStyles.buttonRed}`}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </>
  );
};
export default About;