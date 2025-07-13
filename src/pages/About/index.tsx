import "../../App.css";
import globalStyles from "../Pages.module.css";
import automotores from "../../assets/automotores.jpg";

const About = () => {
  return (
    <>
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
      >
        <h1 className={globalStyles.title}>Acerca de nosotros</h1>

        <p className={globalStyles.description}>
          ¡Bienvenido a nuestra concesionaria de automotores! Nos especializamos
          en ofrecerte la mejor selección de vehículos nuevos y usados, con
          atención personalizada y asesoramiento profesional. Nuestro objetivo
          es ayudarte a encontrar el auto ideal que se adapte a tus necesidades
          y presupuesto, brindándote confianza y seguridad en cada paso del
          proceso. ¡Visítanos y descubrí por qué somos tu mejor opción!
        </p>
        <h2 className={globalStyles.homeTitle}>Contáctanos</h2>

        <div className={globalStyles.formAuto}>
          <p className={globalStyles.description}>
            Si tienes alguna pregunta o necesitas más información, no dudes en
            contactarnos:
          </p>
          <p className={globalStyles.formLabel}>
            Teléfono: <a href="tel:+123456789">+123 456 789</a>
          </p>
          <p className={globalStyles.formLabel}>
            Correo electrónico:{" "}
            <a href="mailto:MDWautomotores@gmail.com">
              MDWautomotores@gmail.com
            </a>
          </p>
        </div>
        <form className={globalStyles.formAuto}>
          <label className={globalStyles.formLabel}>
            Nombre:
            <input type="text" className={globalStyles.input} required />
          </label>
          <label className={globalStyles.formLabel}>
            Correo electrónico:
            <input type="email" className={globalStyles.input} required />
          </label>
          <label className={globalStyles.formLabel}>
            Mensaje:
            <textarea className={globalStyles.textarea} required></textarea>
          </label>
          <button type="submit" className={globalStyles.button}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};
export default About;
