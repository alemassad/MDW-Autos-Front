import styles from "./styles.module.css";

export interface Auto {
  _id: number | string;
  name: string;
  description: string;
  amount: number;
  price: number;
  image?: string;
  isActive?: boolean;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Card = ({ auto }: { auto: Auto }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.infoContainer}>
        <h2 className={styles.categoryName}>{auto.name}</h2>
        <p className={styles.categoryId}>ID: {auto._id}</p>
        <p className={styles.categoryDescription}>{auto.description}</p>
        <p className={styles.categoryId}>Stock: {auto.amount}</p>
        <p className={styles.categoryId}>Precio: u$s {auto.price}</p>
      </div>
      {auto.image && (
        <img
          src={auto.image}
          alt={"Foto de " + auto.name}
          className={styles.image}
        />
      )}
    </div>
  );
};

export default Card;
