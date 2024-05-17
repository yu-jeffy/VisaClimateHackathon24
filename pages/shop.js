// pages/shop.js
import { useEffect, useState } from 'react';

const fetchItems = async () => {
  const response = await fetch('/api/fetch-items?num=0'); // Fetch all items
  const data = await response.json();
  return data.items;
};

const Shop = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('eco_rating');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h1>Shop</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        <button onClick={() => handleSort('eco_rating')}>Sort by Eco-Rating</button>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleSort('nutrition_facts.calories')}>Sort by Calories</button>
      </div>
      <div className="item-grid">
        {sortedItems.map((item, index) => (
          <div key={index} className="item-card" onClick={() => alert('Item clicked')}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Eco-Rating: {item.eco_rating}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .item-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .item-card {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .item-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Shop;
