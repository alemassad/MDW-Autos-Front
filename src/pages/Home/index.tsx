import globalStyles from "../Pages.module.css";
import automotores from "../../assets/automotores.jpg";

const Home = () => {
  return (
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

      <div className={globalStyles.homeContent}>
        <section className={globalStyles.homeSection}>
          <h2 className={globalStyles.homeTitle}>¿Qué ofrecemos?</h2>
          <ul className={globalStyles.ulDescription}>
            <li>Venta de vehículos 0 km y usados</li>
            <li>Financiación a medida</li>
            <li>Gestión de trámites y patentes</li>
            <li>Servicio post-venta y mantenimiento</li>
          </ul>
        </section>
        <section className={globalStyles.homeSection}>
          <h2 className={globalStyles.homeTitle}>¿Por qué elegirnos?</h2>
          <p className={globalStyles.description}>
            En Automotores MDW, nos comprometemos a ofrecerte la mejor
            experiencia de compra. Contamos con un equipo de profesionales
            capacitados para asesorarte en cada paso, garantizando transparencia
            y confianza. ¡Tu satisfacción es nuestra prioridad!
          </p>
        </section>
      </div>
    </div>
  );
};
export default Home;
