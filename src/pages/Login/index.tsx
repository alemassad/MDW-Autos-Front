import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error login:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={globalStyles.title}>Login</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <form onSubmit={handleLogin} className={globalStyles.formAuto}>
          <div className={globalStyles.formGroup}>
            <label htmlFor="email" className={globalStyles.formLabel}>
              Email:
            </label>
            <input
              type="email"
              className={globalStyles.formInput}
              onChange={handleEmailChange}
            />
          </div>
          <div className={globalStyles.formGroup}>
            <label htmlFor="password" className={globalStyles.formLabel}>
              Password:
            </label>
            <input
              type="password"
              className={globalStyles.formInput}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className={globalStyles.formButton}
          >
            Login
          </button>
        </form>
      )}
    </>
  );
};

export default Login;
