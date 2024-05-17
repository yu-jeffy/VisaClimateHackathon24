// components/ExpandedItem.js
import { useCart } from '../context/CartContext';
import styles from '../styles/ExpandedItem.module.css';

const ExpandedItem = ({ item, onClose }) => {
  const { addItemToCart } = useCart();

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>{item.name}</h2>
        <p>Price: ${item.price}</p>
        <p>Eco-Rating: {item.eco_rating}</p>
        <p>Expiry Date: {item.expiry_date}</p>
        <p>Manufacture Date: {item.manufacture_date}</p>
        <p>Shelf Life: {item.shelf_life}</p>
        <p>Quantity: {item.quantity}</p>
        <h3>Nutrition Facts</h3>
        <ul>
          <li>Calories: {item.nutrition_facts.calories}</li>
          <li>Carbs: {item.nutrition_facts.carbs}</li>
          <li>Fats: {item.nutrition_facts.fats}</li>
          <li>Proteins: {item.nutrition_facts.proteins}</li>
          <li>Fiber: {item.nutrition_facts.fiber}</li>
          <li>Sugar: {item.nutrition_facts.sugar}</li>
        </ul>
        <h3>Ingredients</h3>
        <ul>
          {item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>Category: {item.category}</p>
        <p>Subcategory: {item.subcategory}</p>
        <p>Brand: {item.brand}</p>
        <button className={styles.addToCartButton} onClick={() => addItemToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ExpandedItem;
