import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import loginAuto from "../../assets/loginAuto.webp";
import api from "../../config/axios";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "./validations";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("token", token);

      const response = await api.get(`/users/email/${data.email}`);

      localStorage.setItem(
        "user",
        JSON.stringify({
          isAdmin: response.data.isAdmin || false,
        })
      );
      navigate("/");
    } catch (error: unknown) {
      const err = error as { message?: string };
      setError("password", {
        type: "manual",
        message: err.message || "Credenciales incorrectas o error del servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={globalStyles.container}
        style={{
          backgroundImage: `url(${loginAuto})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "50vw",
          maxHeight: "50vh",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 className={globalStyles.title}>Login</h2>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={globalStyles.formAuto}
          >
            <div className={globalStyles.formGroup}>
              <label htmlFor="email" className={globalStyles.formLabel}>
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                className={globalStyles.formInput}
              />
              {errors.email && (
                <p className={globalStyles.formError}>{errors.email.message}</p>
              )}
            </div>
            <div className={globalStyles.formGroup}>
              <label htmlFor="password" className={globalStyles.formLabel}>
                Password:
              </label>
              <input
                type="password"
                {...register("password")}
                className={globalStyles.formInput}
              />
              {errors.password && (
                <p className={globalStyles.formError}>{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className={globalStyles.formButton}>
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
