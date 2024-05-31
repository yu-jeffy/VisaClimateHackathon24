import { useEffect, useState } from 'react';
import { fetchStores } from '../lib/fetchStores';
import styles from '../styles/Earn.module.css';
import React from 'react';
import EarnMeter from '../components/EarnMeter';
import { useUser } from '../context/UserContext';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import StoreSuggest from '../components/StoreSuggest';

export default function Earn() {
    const [userPoints, setUserPoints] = useState(0);
    const [totalGoal, setTotalGoal] = useState(100);

    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [txHistory, setTxHistory] = useState([]);

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const userDocRef = doc(db, 'user_profiles', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                    setTxHistory(userData.tx_history);
                    setUserPoints(userData.points_current_month || 0);
                }
            };

            fetchUserData();
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user]);

    useEffect(() => {
        const getStores = async () => {
            const storesList = await fetchStores();
            setStores(storesList);
        };

        getStores();
    }, []);

    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const response = await fetch('/api/claimTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.uid,
                amount: parseFloat(amount),
                name_id: selectedStore,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            const updatedTxHistory = txHistory.map(tx => {
                if (tx.name_id === selectedStore && tx.amount === parseFloat(amount) && !tx.claimed) {
                    return { ...tx, claimed: true };
                }
                return tx;
            });

            setTxHistory(updatedTxHistory);
            setUserPoints(prevPoints => prevPoints + result.pointsToAdd);

            setMessage(`Points added: ${result.pointsToAdd}`);
        } else {
            setMessage(result.error || 'Error claiming transaction.');
        }
    };

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className={styles.earnContainer}>
            <h1 className={styles.title}>Sustainability Reward Points</h1>
            <EarnMeter points={userPoints} goal={totalGoal} />
            <form onSubmit={handleSubmit} className={styles.earnForm}>
                <h2 className={styles.title2}>Redeem a Purchase:</h2>  
                <div className={styles.dropdownContainer}>
                    <label htmlFor="storeSelect" className={styles.label}>Select a store:</label>
                    <select id="storeSelect" value={selectedStore} onChange={handleStoreChange} className={styles.dropdown}>
                        <option value="">--Select a store--</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>
                                {store.name_display}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="amount" className={styles.label}>Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className={styles.input}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
            {
                userData && <StoreSuggest familySize={userData.family_size} annualIncome={userData.annual_income} />
            }
        </div>
    );
}
