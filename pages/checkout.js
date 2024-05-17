import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/Checkout.module.css';
import Link from 'next/link';
import RecipesCart from '@/components/RecipesCart';

const Checkout = () => {
    const { cart, removeItemFromCart, clearCart } = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.column2}>
                <RecipesCart isVisible={cart.length > 0} />
                <Link href="/shop">
                    <button className={styles.backToShopButton}>Continue Shopping</button>
                </Link>
            </div>
            <div className={styles.cartColumn}>
                <h2 className={styles.cartTitle}>Cart</h2>
                {cart.length === 0 ? (
                    <p className={styles.emptyCartMessage}>Your cart is empty</p>
                ) : (
                    <>
                        <ul className={styles.cartItemsList}>
                            {cart.map((item, index) => (
                                <li key={index} className={styles.cartItem}>
                                    <div className={styles.cartItemDetails}>
                                        <p className={styles.cartItemName}>{item.name}</p>
                                        <p className={styles.cartItemPrice}>
                                            ${item.price} x {item.quantity}
                                        </p>
                                        <p className={styles.cartItemSubtotal}>
                                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <button className={styles.removeItemButton} onClick={() => removeItemFromCart(item)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <p className={styles.totalPrice}>Total: ${totalPrice}</p>
                        <button className={styles.clearCartButton} onClick={clearCart}>Clear Cart</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Checkout;
