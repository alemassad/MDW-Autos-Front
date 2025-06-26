import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import autoLogo from "../../assets/coche-clasico.png";
import "../../App.css";
import type { LogoInterface } from "../../components/logo/Logo";
import type { Auto as AutoType} from "../../components/Card";
import Logo from "../../components/logo/Logo";
import globalStyles from "../Pages.module.css";

const logoData: LogoInterface[] = [
  {
    src: autoLogo,
    href: "https://mdw-autos-front.vercel.app",
    className: "logo-react",
    alt: "MDW Autos logo",
  },
];

const Auto = () => {
  const [auto, setAuto] = useState<AutoType>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setAuto(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <h1>Vehiculo</h1>
        {logoData.map((logo, index) => (
          <Logo
            key={index}
            src={logo.src}
            href={logo.href}
            className={logo.className}
            alt={logo.alt}
          />
        ))}
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h2>{auto?.name}</h2>
          <p>{auto?.status}</p>
          <img src={auto?.image} alt={auto?.name} />
        </div>
      )}{" "}
      <button className={globalStyles.button} onClick={() => navigate("/")}>
        Go to Autos
      </button>
      <button
        className={`${globalStyles.button} ${globalStyles.buttonGreen}`}
        onClick={() => navigate("/about")}
      >
        Go to About
      </button>
    </>
  );
};

export default Auto;
