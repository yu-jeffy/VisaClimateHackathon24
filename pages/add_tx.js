import { useEffect, useState } from 'react';
import { fetchStores } from '../lib/fetchStores';
import styles from '../styles/Earn.module.css';
import { useUser } from '../context/UserContext';
import router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function AddTransaction() {
    const { user } = useUser();
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

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

        try {
            const response = await fetch('/api/addTransaction', {
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
                setMessage(`Transaction added successfully: ${JSON.stringify(result.newTransaction)}`);
            } else {
                setMessage(result.error || 'Error adding transaction.');
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            setMessage('Error adding transaction.');
        }
    };

    if (!user) {
        return <p>Please log in to add a transaction.</p>;
    }

    return (
        <div className={styles.earnContainer}>
            <h1>Add Transaction</h1>
            <form onSubmit={handleSubmit} className={styles.earnForm}>
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
        </div>
    );
}
