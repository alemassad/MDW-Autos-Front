import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getUserById, editUser, clearEditState } from "../../slices/userEdit";
import { useParams, useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import type { User } from "../../types/user";
import miraAuto from "../../assets/miraAuto.webp";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userEditSchema } from "./validations";

const UserEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector(
    (state) => state.reducer.userEdit
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: joiResolver(userEditSchema),
    defaultValues: {
      name: "",
      lastname: "",
      birthdate: "",
      email: "",
      isAdmin: false,
      isActive: true,
    },
  });

  useEffect(() => {
    if (id) dispatch(getUserById(id));
    return () => {
      dispatch(clearEditState());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        lastname: user.lastname || "",
        birthdate: user.birthdate ? user.birthdate.split("T")[0] : "",
        email: user.email || "",
        isAdmin: !!user.isAdmin,
        isActive: user.isActive === undefined ? true : user.isActive,
      });
    }
  }, [user, reset]);

  type FormData = {
    name: string;
    lastname: string;
    birthdate: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
  };

  const onSubmit = (data: FormData) => {
    if (!id) return;

    const userData: Partial<Omit<User, "_id">> = {
      name: data.name,
      lastname: data.lastname,
      birthdate: data.birthdate,
      email: data.email,
      isAdmin: data.isAdmin,
      isActive: data.isActive,
    };
    dispatch(editUser({ id, data: userData }));
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${miraAuto})`,
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
      <h1 className={globalStyles.title}>Modificar Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          className={globalStyles.formInput}
          required
        />
        {errors.name && (
          <span className={globalStyles.formError}>{errors.name.message}</span>
        )}

        <label className={globalStyles.formLabel} htmlFor="lastname">
          Apellido
        </label>
        <input
          id="lastname"
          {...register("lastname")}
          type="text"
          className={globalStyles.formInput}
          required
        />
        {errors.lastname && (
          <span className={globalStyles.formError}>
            {errors.lastname.message}
          </span>
        )}

        <label className={globalStyles.formLabel} htmlFor="birthdate">
          Fecha de Nacimiento
        </label>
        <input
          id="birthdate"
          {...register("birthdate")}
          type="date"
          className={globalStyles.formInput}
          required
        />
        {errors.birthdate && (
          <span className={globalStyles.formError}>
            {errors.birthdate.message}
          </span>
        )}

        <label className={globalStyles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          className={globalStyles.formInput}
          required
        />
        {errors.email && (
          <span className={globalStyles.formError}>{errors.email.message}</span>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.5rem 0",
          }}
        >
          <input
            id="isAdmin"
            {...register("isAdmin")}
            type="checkbox"
            className={globalStyles.formCheckbox}
          />
          <label className={globalStyles.formLabel} htmlFor="isAdmin">
            ¿Es Administrador?
          </label>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.5rem 0",
          }}
        >
          <input
            id="isActive"
            {...register("isActive")}
            type="checkbox"
            className={globalStyles.formCheckbox}
          />
          <label className={globalStyles.formLabel} htmlFor="isActive">
            ¿Usuario Activo?
          </label>
        </div>

        <button
          type="submit"
          className={globalStyles.formButton}
          disabled={loading}
        >
          {loading ? "Modificando..." : "Modificar User"}
        </button>
        {loading && <div className={globalStyles.spinner}></div>}
      </form>
      {error && (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      )}
      {success && (
        <p className={globalStyles.formSuccess} style={{ textAlign: "center" }}>
          {success}
        </p>
      )}
      <button
        className={globalStyles.formButton}
        style={{ marginTop: 16 }}
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
};

export default UserEdit;
