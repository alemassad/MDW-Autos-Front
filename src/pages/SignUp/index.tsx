import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
//import type { ChangeEvent } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSignUp = handleSubmit(async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error signing up:", error);
      setLoading(false);
    }
  });

  return (
    <>
      <h2 className={globalStyles.title}>SignUp</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <form onSubmit={handleSignUp} className={globalStyles.formAuto}>
          <div className={globalStyles.formGroup}>
            <label htmlFor="email" className={globalStyles.formLabel}>
              Email:
            </label>
            <input
              className={globalStyles.formInput}
              {...register("email", {
                required: {
                  value: true,
                  message: "Se requiere un eMail",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de eMail inválido",
                },
              })}
            />
            {errors?.email && (
              <p className={globalStyles.formError}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={globalStyles.formGroup}>
            <label htmlFor="password" className={globalStyles.formLabel}>
              Password:
            </label>
            <input
              className={globalStyles.formInput}
              {...register("password", {
                required: {
                  value: true,
                  message: "Se requiere una contraseña",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors?.password && (
              <p className={globalStyles.formError}>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={globalStyles.formGroup}>
            <label htmlFor="password" className={globalStyles.formLabel}>
              Repeat Password:
            </label>
            <input
              className={globalStyles.formInput}
              {...register("repeatPassword", {
                required: {
                  value: true,
                  message: "Se requiere repetir contraseña",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors?.repeatPassword && (
              <p className={globalStyles.formError}>
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
          <button type="submit" className={globalStyles.formButton}>
            Sign Up
          </button>
        </form>
      )}
    </>
  );
};

export default SignUp;
