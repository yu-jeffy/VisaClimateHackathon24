import { useState, useEffect } from 'react';
import styles from '../styles/GroceryList.module.css';

const GroceryList = () => {
    const [groceries, setGroceries] = useState([]);
    const [newItem, setNewItem] = useState({ quantity: '', name: '' });

    useEffect(() => {
        const savedGroceries = JSON.parse(localStorage.getItem('groceries'));
        if (savedGroceries) {
            setGroceries(savedGroceries);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('groceries', JSON.stringify(groceries));
    }, [groceries]);

    const handleAddItem = () => {
        if (newItem.name && newItem.quantity) {
            setGroceries([...groceries, newItem]);
            setNewItem({ quantity: '', name: '' });
        }
    };

    const handleRemoveItem = (index) => {
        const updatedGroceries = groceries.filter((_, i) => i !== index);
        setGroceries(updatedGroceries);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Grocery List</h1>
            <h3 className={styles.title}>Plan your next trip to the store!</h3>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                    className={styles.input}
                />
                <button onClick={handleAddItem} className={styles.button}>Add Item</button>
            </div>
            <ul className={styles.list}>
                {groceries.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        {item.quantity} x {item.name}
                        <button onClick={() => handleRemoveItem(index)} className={styles.removeButton}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroceryList;
