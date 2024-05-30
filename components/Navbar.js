import Link from 'next/link';
import { useUser } from '../context/UserContext';
import SignOutButton from './SignOutButton';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/" className={styles.logoText}>VISA GROCERY</Link>
            </div>
            <div className={styles.navLinks}>
                <Link href="/earn" className={styles.navLinkText}>Earn</Link>
                <Link href="/profile" className={styles.navLinkText}>Profile</Link>
                <Link href="/recipes" className={styles.navLinkText}>Recipes</Link>
                <Link href="/receipts" className={styles.navLinkText}>Receipts</Link>
                <Link href="/add_tx" className={styles.navLinkText}>Add_Tx</Link>
                {user ? (
                    <>
                        <SignOutButton className={styles.navLinkText}/>
                    </>
                ) : (
                    <>
                        <Link href="/login" className={styles.navLinkText}>Log In</Link>
                        <Link href="/signup" className={styles.navLinkText}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
