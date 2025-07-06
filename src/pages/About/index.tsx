import "../../App.css";
import globalStyles from "../Pages.module.css";
import automotores from "../../assets/automotores.jpg";

const About = () => {
  return (
    <>
      <h1 className={globalStyles.title}>Acerca de nosotros</h1>

      <p className={globalStyles.description}>
        ¡Bienvenido a nuestra concesionaria de automotores! Nos especializamos
        en ofrecerte la mejor selección de vehículos nuevos y usados, con
        atención personalizada y asesoramiento profesional. Nuestro objetivo es
        ayudarte a encontrar el auto ideal que se adapte a tus necesidades y
        presupuesto, brindándote confianza y seguridad en cada paso del proceso.
        ¡Visítanos y descubrí por qué somos tu mejor opción!
      </p>
      <div
        className={globalStyles.container}
        style={{
          backgroundImage: `url(${automotores})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </>
  );
};
export default About;
