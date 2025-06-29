import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import autoLogo from "../../assets/coche-clasico.png";
import "../../App.css";
import type { LogoInterface } from "../../components/logo/Logo";
import type { Auto } from "../../components/Card";
import Logo from "../../components/logo/Logo";
import Card from "../../components/Card";
import globalStyles from "../Pages.module.css";
import SignOutButton from "../../components/SignOutButton";

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
    }, 500);
    setAutos(data.results);
  };
  const token = localStorage.getItem("token");
  const fetchCarsById = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/cars/6847f655c955749ad24c3380",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("FetchCarsById: ", response);
    } catch (error) {
      console.error("Error fetching car by ID:", error);
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchData();
    fetchCarsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {logoData.map((logo, index) => (
        <Logo
          key={index}
          src={logo.src}
          href={logo.href}
          className={logo.className}
          alt={logo.alt}
        />
      ))}
      <h1 className={globalStyles.title}>Automotores</h1>
      <SignOutButton />
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
        Go to Home
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

export default Automotores;
