import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getUserById } from "../../slices/user";
import userCar from "../../assets/userCar.jpg";
import UserCard from "../../components/UserCard";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userIdSchema } from "./validations";

type FormValues = {
  userId: string;
};

const UserBuscar = () => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: joiResolver(userIdSchema),
    defaultValues: { userId: paramId || "" },
  });

  useEffect(() => {
    if (paramId) {
      dispatch(getUserById(paramId));
      setValue("userId", paramId);
    }
  }, [paramId, dispatch, setValue]);

  const onSubmit = (data: FormValues) => {
    if (data.userId.trim()) {
      navigate(`/users/${data.userId.trim()}`);
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
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="userId">
          ID del usuario
        </label>
        <input
          id="userId"
          type="text"
          {...register("userId")}
          placeholder="Ingresar Id"
          className={globalStyles.formInput}
        />
        {errors.userId && (
          <p className={globalStyles.formError}>{errors.userId.message}</p>
        )}
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
