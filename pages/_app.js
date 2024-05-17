import React from 'react';
import App from 'next/app';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import FontAwesome CSS
import NavBar from '../components/NavBar';
import { CartVisibilityProvider } from '../context/CartVisibilityContext';

function MyApp({ Component, pageProps }) {
    return (
        <CartProvider>
            <CartVisibilityProvider>
                <NavBar />
                <Component {...pageProps} />
            </CartVisibilityProvider>
        </CartProvider>
    );
}

export default MyApp;