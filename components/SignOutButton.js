import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import styles from '../styles/SignOutButton.module.css';

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/'); // Redirect to home page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button onClick={handleSignOut} className={styles.signOutButton}>
            Sign Out
        </button>
    );
}
