import Link from 'next/link';
import styles from '../styles/NavBar.module.css';
import { useCartVisibility } from '../context/CartVisibilityContext';

const NavBar = () => {
    const { toggleCartVisibility } = useCartVisibility();

    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    RE-VISA
                </Link>
            </div>
            <nav>
                <ul className={styles.navLinks}>
                    <li><Link href="/shop">SHOP</Link></li>
                    <li><Link href="/about">ABOUT</Link></li>
                    <li><Link href="/contact">CONTACT</Link></li>
                    <button className={styles.cartToggleButton} onClick={toggleCartVisibility}>
                        <i className={'fas fa-shopping-cart'}></i>
                    </button>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
