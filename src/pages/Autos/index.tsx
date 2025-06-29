import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
//import type { Auto } from "../../components/Card";
import Card from "../../components/Card";
import globalStyles from "../Pages.module.css";
import SignOutButton from "../../components/SignOutButton";

import { useSelector, useDispatch } from "../../store/store";
import { getAutos } from "../../slices/autos";



const Automotores = () => {
  //const [autos, setAutos] = useState<Auto[]>([]);
  //const [loading, setLoading] = useState<boolean>(false);

  const { lista, loading } = useSelector(
    (state) => state.reducer.autos
  );
  console.log("Lista de autos desde Redux:", lista);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  /*  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?count=20"
    );
    const data = await response.json();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setAutos(data.results);
  }; */
  //const token = localStorage.getItem("token");
  /*   const fetchCarsById = async () => {
    //setLoading(true);
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
      //setLoading(false);
    }, 500);
  }; */

  useEffect(() => {
    //fetchData();
    if (!lista.length) {
      dispatch(getAutos());
    }
    //fetchCarsById();
  }, [dispatch, lista]);

  return (
    <>
          <h1 className={globalStyles.title}>Automotores</h1>
      <SignOutButton />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="cardList">
          { lista.map((auto) => (
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
