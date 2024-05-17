import React from 'react';
import App from 'next/app';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import FontAwesome CSS

function MyApp({ Component, pageProps }) {
    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    );
}

export default MyApp;