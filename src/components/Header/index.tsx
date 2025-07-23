import { useNavigate, useLocation } from "react-router-dom";
import { tokenList, headerList, logoData, type NavItem, adminList } from "./consts";
import styles from "./styles.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import Logo from "../logo/Logo";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleOnClick = (link: string) => {
    navigate(link);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const renderNavItem = (item: NavItem, index: number) => {
    if ("items" in item) {
      const isDropdownOpen = openDropdown === index;
      return (
        <li key={index} className={styles.dropdown}>
          <span
            className={styles.item}
            onClick={() =>
              setOpenDropdown(isDropdownOpen ? null : index)
            }
          >
            {item.title}
          </span>
          <ul
            className={`${styles.dropdownContent} ${
              isDropdownOpen ? styles.showMenu : ""
            }`}
          >
            {item.items.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className={`${styles.item} ${
                  location.pathname === subItem.link ? styles.active : ""
                }`}
                onClick={() => {
                  handleOnClick(subItem.link);
                  setMenuOpen(false);
                  setOpenDropdown(null);
                }}
              >
                {subItem.title}
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return (
      <li
        key={index}
        className={`${styles.item} ${
          location.pathname === item.link ? styles.active : ""
        }`}
        onClick={() => handleOnClick(item.link)}
      >
        {item.title}
      </li>
    );
  };

  const getNavItems = () => {
    if (!token) {
      return headerList; // No hay token, mostrar headerList
    }

    if (user?.isAdmin) {
      return adminList; // Hay usuario y es admin, mostrar adminList
    }

    return tokenList; // Hay token pero no es admin, mostrar tokenList
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        {logoData.map((logo, index) => (
          <Logo
            key={index}
            src={logo.src}
            href={logo.href}
            className={logo.className}
            alt={logo.alt}
          />
        ))}
        <h1 className={styles.title}>MDW Automotores</h1>
        {logoData.map((logo, index) => (
          <Logo
            key={index}
            src={logo.src}
            href={logo.href}
            className={logo.className}
            alt={logo.alt}
          />
        ))}
      </div>
      <button
        className={styles.menuButton}
        aria-label="Abrir menú"
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>
      <nav className={styles.nav}>
        <ul className={`${styles.list} ${menuOpen ? styles.showMenu : ""}`}>
          {getNavItems().map(renderNavItem)}
          {token && (
            <li
              key="logout"
              className={`${styles.item} ${styles.logout}`}
              onClick={handleLogout}
            >
              Cerrar sesión
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
