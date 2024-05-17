// components/Cart.js
import { useCart } from '../context/CartContext';
import styles from '../styles/Cart.module.css';

const Cart = ({ isVisible, toggleVisibility }) => {
    const { cart, removeItemFromCart, clearCart } = useCart();

    return (
        <div className={`${styles.cartContainer} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.cartHeader}>
                <h2 className={styles.cartTitle}>Cart</h2>
                {/* <button className={styles.closeButton} onClick={toggleVisibility}>X</button> */}
            </div>
            {cart.length === 0 ? (
                <p className={styles.emptyCartMessage}>Your cart is empty</p>
            ) : (
                <>
                    <ul className={styles.cartItemsList}>
                        {cart.map((item, index) => (
                            <li key={index} className={styles.cartItem}>
                                <div className={styles.cartItemDetails}>
                                    <p className={styles.cartItemName}>{item.name}</p>
                                    <p className={styles.cartItemPrice}>${item.price}</p>
                                </div>
                                <button className={styles.removeItemButton} onClick={() => removeItemFromCart(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button className={styles.clearCartButton} onClick={clearCart}>Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;
