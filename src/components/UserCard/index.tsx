import styles from "./styles.module.css";
import type { User } from "../../types/user";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.infoContainer}>
        <h2 className={styles.categoryName}>
          {user.name} {user.lastname}
        </h2>
        <p className={styles.categoryId}>ID: {user._id}</p>
        <p className={styles.categoryDescription}>Email: {user.email}</p>
        <p className={styles.categoryId}>Fecha de nacimiento: {new Date(user.birthdate).toLocaleDateString()}</p>
        <p className={styles.categoryId}>Admin: {user.isAdmin ? 'Si' : 'No'}</p>
      </div>
    </div>
  );
};

export default UserCard;
