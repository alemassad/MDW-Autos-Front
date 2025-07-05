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
        <h2 className={styles.name}>{auto.name}</h2>
        <p className={styles.id}>ID: {auto._id}</p>
        <p className={styles.description}>{auto.description}</p>
        <p className={styles.amount}>Stock: {auto.amount}</p>
        <p className={styles.price}>Precio: u$s {auto.price}</p>
      </div>
      {auto.image && (
        <img src={auto.image} alt={'Foto de '+ auto.name} className={styles.image} />
      )}
    </div>
  );
};

export default Card;
