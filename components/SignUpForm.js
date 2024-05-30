import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from '../styles/SignUpForm.module.css';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [familySize, setFamilySize] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setSuccess('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'user_profiles', user.uid), {
                email,
                annual_income: parseFloat(annualIncome),
                family_size: parseInt(familySize, 10),
                tx_history: [],
            });

            setSuccess('Signup successful');
            router.push('/profile'); // Redirect to profile page
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <form onSubmit={handleSubmit} className={styles.signUpForm}>
                <h2 className={styles.signUpTitle}>Sign Up</h2>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>{success}</p>}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="annualIncome" className={styles.formLabel}>Annual Income</label>
                    <input
                        type="number"
                        id="annualIncome"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="familySize" className={styles.formLabel}>Family Size</label>
                    <input
                        type="number"
                        id="familySize"
                        value={familySize}
                        onChange={(e) => setFamilySize(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
        </div>
    );
}
