import { useNavigate, useLocation } from "react-router-dom";
import { tokenList, headerList } from "./consts";
import styles from "./styles.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleOnClick = (link: string) => {
    navigate(link);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>MDW Automotores</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {isLoggedIn
            ? (
                <>
                  {tokenList.map((item, index) => (
                    <li
                      key={index}
                      className={
                        location.pathname === item.link
                          ? `${styles.item} ${styles.active}`
                          : styles.item
                      }
                      onClick={() => handleOnClick(item.link)}
                    >
                      {item.title}
                    </li>
                  ))}
                  <li
                    key="logout"
                    className={`${styles.item} ${styles.logout}`}
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </li>
                </>
              )
            : headerList.map((item, index) => (
                <li
                  key={index}
                  className={
                    location.pathname === item.link
                      ? `${styles.item} ${styles.active}`
                      : styles.item
                  }
                  onClick={() => handleOnClick(item.link)}
                >
                  {item.title}
                </li>
              ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
