import { useEffect, useState } from 'react';
import { fetchStores } from '../lib/fetchStores';
import styles from '../styles/Earn.module.css';
import React from 'react';
import Head from 'next/head';
import EarnMeter from '../components/EarnMeter';
import { useUser } from '../context/UserContext';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import router from 'next/router';

export default function Earn() {
    // Set these to adjust the bar values
    const [userPoints, setUserPoints] = useState(0);
    const [totalGoal, setTotalGoal] = useState(100);

    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [txHistory, setTxHistory] = useState([]);

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

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
    }, [user]); // Dependency array includes user

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

        const selectedStoreData = stores.find(store => store.name_id === selectedStore);
        if (!selectedStoreData) {
            setMessage('Please select a valid store.');
            return;
        }

        const matchedTx = txHistory.find(tx => tx.store_name === selectedStore && tx.amount === parseFloat(amount) && !tx.claimed);
        if (!matchedTx) {
            setMessage('No matching transaction found.');
            return;
        }

        const pointsToAdd = parseFloat(amount) * selectedStoreData['eco-rating'];
        setUserPoints(prevPoints => prevPoints + pointsToAdd);

        const updatedTxHistory = txHistory.map(tx => {
            if (tx.store_name === selectedStore && tx.amount === parseFloat(amount) && !tx.claimed) {
                return { ...tx, claimed: true };
            }
            return tx;
        });

        await updateDoc(doc(db, 'user_profiles', user.uid), {
            points_current_month: userPoints + pointsToAdd,
            tx_history: updatedTxHistory
        });

        setMessage(`Points added: ${pointsToAdd}`);
    };

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className={styles.earnContainer}>
            <h1>Earn</h1>
            <EarnMeter points={userPoints} goal={totalGoal} />
            <form onSubmit={handleSubmit} className={styles.earnForm}>
                <div className={styles.dropdownContainer}>
                    <label htmlFor="storeSelect" className={styles.label}>Select a store:</label>
                    <select id="storeSelect" value={selectedStore} onChange={handleStoreChange} className={styles.dropdown}>
                        <option value="">--Select a store--</option>
                        {stores.map(store => (
                            <option key={store.name_id} value={store.name_id}>
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
        </div>
    );
}
