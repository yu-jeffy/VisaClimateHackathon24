import { useEffect, useState } from 'react';
import { fetchStores } from '../lib/fetchStores';
import styles from '../styles/Earn.module.css';
import React from 'react';
import Head from 'next/head';
import EarnMeter from '../components/EarnMeter';

export default function Earn() {
    // Set these to adjust the bar visually
    const [userPoints, setUserPoints] = useState(0);
    const [totalGoal, setTotalGoal] = useState(100);

    const addPoints = (pointsToAdd) => {
        setUserPoints(prevPoints => prevPoints + pointsToAdd);
    }

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

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

    return (
        <div className={styles.earnContainer}>
            <h1>Earn</h1>
            <EarnMeter points={userPoints} goal={totalGoal} />
            <button onClick={() => addPoints(10)}>Add 10 Points</button>
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
        </div>
    );
}
