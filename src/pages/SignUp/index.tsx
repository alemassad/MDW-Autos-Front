import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";

const SignUp = () => {
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
  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      setTimeout(() => {
        setLoading(false);
      }, 500);
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={globalStyles.container}>
      <h2 className={globalStyles.title}>SignUp</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <form className={globalStyles.formAuto}>
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
            type="button"
            className={globalStyles.formButton}
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
