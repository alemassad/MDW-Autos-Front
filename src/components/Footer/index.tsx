import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} MDW Automotores. All rights reserved.
        </p>
        <p>
          Developed by{" "}
          <a href="#" className={styles.developer}>
            Luis Massad
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
