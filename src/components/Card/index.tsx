import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface Location {
  name: string;
}
export interface Auto {
  name: string;
  id: number;
  status: string;
  image: string;
  gender: string;
  species: string;
  location: Location;
}
const Specie = {
  HUMAN: "Human",
  Alien: "Alien",
  Robot: "Robot",
  Other: "Other",
} as const;
type Specie = typeof Specie[keyof typeof Specie];
interface StatusType {
  [key: string]: string;
}

const PropertyCheckStatus: StatusType = {
  Alive: styles.propertyAlive,
  Dead: styles.propertyDead,
  unknown: styles.propertyUnknown,
};
const Card = ({ auto }: { auto: Auto }) => {

  const isHuman = auto.species === Specie.HUMAN;
  
  return (
    <div className={isHuman ? styles.humanCardContainer : styles.alienCardContainer}>
      <div className={styles.nameContainer}>
        <Link to={`${auto.id}`} className={styles.nameLink}>
          <p className={styles.propertyName}>{auto.name}</p>
        </Link>
          </div>
      <img src={auto.image} alt={auto.name} className={styles.image} />
      <div className={styles.properties}>
        <div className={styles.propertiesContainerStart}>
          <p className={styles.propertyName}>{auto.name}</p>
          <p className={PropertyCheckStatus[auto.status]}>{auto.status}</p>
        </div>
        <div className={styles.propertiesContainerEnd}>
          <p className={styles.property}>{auto.gender}</p>
          <p className={styles.property}>{auto.species}</p>
        </div>
        <p className={styles.propertyLocation}>{auto.location.name}</p>
      </div>
    </div>
  );
};
export default Card;
