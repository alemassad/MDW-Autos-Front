import styles from './styles.module.css';
import type { Category } from '../../types/category'; 

const CardCategory = ({ category }: { category: Category }) => {
  return (
    <div className={styles.categoryCardContainer}>
      <h2 className={styles.categoryName}>{category.name}</h2>
      <p className={styles.categoryId}>{category._id}</p>
      <p className={styles.categoryDescription}>{category.description}</p>
      
      {category.cars && category.cars.length > 0 ? (
        <p className={styles.categoryCars}>
          Coches: {           
            category.cars.map(car => car.name).join(', ')
          }
        </p>
        ) : (
        <p className={styles.categoryCars}>No hay coches asociados a esta categoría.</p>
      )}
    </div>
  );
};

export default CardCategory;
