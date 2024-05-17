import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (item) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id && cartItem.name === item.name);
            if (itemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };
    const removeItemFromCart = (item) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (itemIndex >= 0) {
                const updatedCart = [...prevCart];
                if (updatedCart[itemIndex].quantity > 1) {
                    updatedCart[itemIndex].quantity -= 1;
                } else {
                    updatedCart.splice(itemIndex, 1);
                }
                return updatedCart;
            }
            return prevCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
