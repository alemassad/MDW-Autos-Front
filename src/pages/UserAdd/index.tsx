import { useNavigate } from "react-router-dom";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { addUser } from "../../slices/userAdd";
import registraAuto from "../../assets/registraAuto.avif";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userAddSchema } from "./validations";
import type { User } from "../../types/user";

type FormValues = Omit<User, "_id" | "isActive"> & { password: string };

const UserAdd = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reducer.userAdd);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: joiResolver(userAddSchema),
    defaultValues: { isAdmin: false },
  });

  const isAdmin = watch("isAdmin");

  const onSubmit = (data: FormValues) => {
    dispatch(
      addUser({
        ...data,
        isActive: true,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/users");
      }
    });
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${registraAuto})`,
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
      <h1 className={globalStyles.title}>Agregar Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="Ingresar nombre"
          className={globalStyles.formInput}
        />
        {errors.name && <p className={globalStyles.formError}>{errors.name.message}</p>}

        <label className={globalStyles.formLabel} htmlFor="lastname">
          Apellido
        </label>
        <input
          id="lastname"
          type="text"
          {...register("lastname")}
          placeholder="Ingresar apellido"
          className={globalStyles.formInput}
        />
        {errors.lastname && <p className={globalStyles.formError}>{errors.lastname.message}</p>}

        <label className={globalStyles.formLabel} htmlFor="birthdate">
          Fecha de nacimiento
        </label>
        <input
          id="birthdate"
          type="date"
          {...register("birthdate")}
          className={globalStyles.formInput}
        />
        {errors.birthdate && <p className={globalStyles.formError}>{errors.birthdate.message}</p>}

        <label className={globalStyles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Ingresar email"
          className={globalStyles.formInput}
        />
        {errors.email && <p className={globalStyles.formError}>{errors.email.message}</p>}

        <label className={globalStyles.formLabel} htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Ingresar contraseña"
          className={globalStyles.formInput}
        />
        {errors.password && <p className={globalStyles.formError}>{errors.password.message}</p>}

        <label className={globalStyles.formLabel} htmlFor="isAdmin">
          ¿Es administrador?
        </label>
        <div className={globalStyles.formCheckboxContainer}>
          <input
            id="isAdmin"
            type="checkbox"
            {...register("isAdmin")}
            className={globalStyles.formCheckbox}
          />
          <span
            className={globalStyles.formCheckboxLabel}
            style={{ color: isAdmin ? "green" : "red" }}
          >
            {isAdmin ? "Sí" : "No"}
          </span>
        </div>
        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar"}
        </button>
        {error && <p className={globalStyles.formError}>{error}</p>}
      </form>
    </div>
  );
};

export default UserAdd;
