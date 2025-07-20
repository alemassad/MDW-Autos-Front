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
    dispatch(getUsers());
  }, [dispatch]);
  const activeUsers = lista.filter((user) => user.isActive);

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
        <div className={globalStyles.spinner}></div>
      ) : (
        <div className="cardList">
          {activeUsers.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
