import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/Cart.module.css';
import RecipesCart from './RecipesCart';

const Cart = ({ isVisible, toggleVisibility }) => {
    const { cart, removeItemFromCart, clearCart } = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        isVisible && (
            <div className={styles.container}>
                <div className={styles.cartContainer}>
                    <div className={styles.cartHeader}>
                        <h2 className={styles.cartTitle}>Cart</h2>
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
                            <p className={styles.totalPrice}>Total: ${totalPrice}</p>
                            {/* <button className={styles.clearCartButton} onClick={clearCart}>Clear Cart</button> */}
                        </>
                    )}
                </div>
                <div className={styles.recipeContainer}>
                    <RecipesCart isVisible={isVisible} />
                </div>
            </div>
        )
    );
};

export default Cart;
