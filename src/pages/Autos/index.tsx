import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import autoLogo from "../../assets/coche-clasico.png";
import "../../App.css";
import type { LogoInterface } from "../../components/logo/Logo";
import type { Auto } from "../../components/Card";
import Logo from "../../components/logo/Logo";
import Card from "../../components/Card";
import globalStyles from "../Pages.module.css";

const logoData: LogoInterface[] = [
  {
    src: autoLogo,
    href: "https://mdw-autos-front.vercel.app",
    className: "logo-react",
    alt: "MDW Autos logo",
  },
];

const Automotores = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?count=20"
    );
    const data = await response.json();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setAutos(data.results);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {logoData.map((logo, index) => (
          <Logo
            key={index}
            src={logo.src}
            href={logo.href}
            className={logo.className}
            alt={logo.alt}
          />
        ))}
        <h1>Automotores</h1>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="cardList">
          {autos.map((auto) => (
            <Card key={auto.id} auto={auto} />
          ))}
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
}

export default Automotores;
