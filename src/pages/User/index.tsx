import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getUserById } from "../../slices/user";
import userCar from "../../assets/userCar.jpg";
import UserCard from "../../components/UserCard";

const UserBuscar = () => {
  const { id: paramId } = useParams();
  const [inputId, setInputId] = useState<string>(paramId || "");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramId) {
      dispatch(getUserById(paramId));
    } else {
      setInputId("");
    }
  }, [paramId, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      navigate(`/users/${inputId.trim()}`);
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${userCar})`,
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
      <h1 className={globalStyles.title}>Buscar Usuario por ID</h1>
      <form onSubmit={handleSubmit} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="userId">
          ID del usuario
        </label>
        <input
          id="userId"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Ingresar Id"
          className={globalStyles.formInput}
        />
        <button type="submit" className={globalStyles.formButton}>
          Buscar
        </button>
      </form>

      {loading ? (
        <div className={globalStyles.spinner}></div>
      ) : error ? (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      ) : user ? (
        <div
          className={globalStyles.userCardContainer}
          style={{ marginTop: "20px" }}
        >
          <UserCard user={user} />
        </div>
      ) : null}
    </div>
  );
};

export default UserBuscar;
