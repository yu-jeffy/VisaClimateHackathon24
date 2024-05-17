import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCartVisibility } from '../context/CartVisibilityContext';
import styles from '../styles/Shop.module.css';
import ExpandedItem from '../components/ExpandedItem';
import Cart from '../components/Cart';

const fetchItems = async () => {
    const response = await fetch('/api/fetch-items?num=0'); // Fetch all items
    const data = await response.json();
    return data.items;
};

const Shop = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedItem, setSelectedItem] = useState(null);
    const { addItemToCart } = useCart();
    const { isCartVisible, toggleCartVisibility } = useCartVisibility();

    useEffect(() => {
        fetchItems().then(setItems);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const filteredItems = items.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedItems = filteredItems.sort((a, b) => {
        const keys = sortKey.split('.');
        const aValue = keys.reduce((acc, key) => acc[key], a);
        const bValue = keys.reduce((acc, key) => acc[key], b);

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className={styles.shopPage}>
            <div className={styles.shopContainer}>
                <h1 className={styles.shopTitle}></h1>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className={styles.sortButtonsContainer}>
                    <button className={styles.sortButton} onClick={() => handleSort('eco_rating')}>Sort by Eco-Rating</button>
                    <button className={styles.sortButton} onClick={() => handleSort('name')}>Sort by Name</button>
                    <button className={styles.sortButton} onClick={() => handleSort('price')}>Sort by Price</button>
                    <button className={styles.sortButton} onClick={() => handleSort('nutrition_facts.calories')}>Sort by Calories</button>
                </div>
                <div className={styles.itemGrid}>
                    {sortedItems.map((item, index) => (
                        <div key={index} className={styles.itemCard} onClick={() => handleItemClick(item)}>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <p className={styles.itemPrice}>Price: ${item.price}</p>
                            <p className={styles.itemEcoRating}>Eco-Rating: {item.eco_rating}</p>
                            <button className={styles.addToCartButton} onClick={(e) => { e.stopPropagation(); addItemToCart(item); }}>Add to Cart</button>
                        </div>
                    ))}
                </div>
                {selectedItem && (
                    <ExpandedItem item={selectedItem} onClose={handleClosePopup} />
                )}
            </div>
            <Cart isVisible={isCartVisible} toggleVisibility={toggleCartVisibility} />
        </div>
    );
};

export default Shop;
