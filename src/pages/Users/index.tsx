import { useEffect } from "react";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getUsers } from "../../slices/users";
import UserCard from "../../components/UserCard";
import userCar from "../../assets/userCar.jpg";

const Users = () => {
  const { lista, loading } = useSelector((state) => state.reducer.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!lista.length) {
      dispatch(getUsers());
    }
  }, [dispatch, lista]);

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
      <h1 className={globalStyles.title}>Usuarios</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="cardList">
          {lista.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
