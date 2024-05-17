// context/CartVisibilityContext.js
import { createContext, useContext, useState } from 'react';

const CartVisibilityContext = createContext();

export const useCartVisibility = () => useContext(CartVisibilityContext);

export const CartVisibilityProvider = ({ children }) => {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCartVisibility = () => {
        setIsCartVisible(prevState => !prevState);
    };

    return (
        <CartVisibilityContext.Provider value={{ isCartVisible, toggleCartVisibility }}>
            {children}
        </CartVisibilityContext.Provider>
    );
};
