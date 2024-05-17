// pages/api/fetch-items.js
import { db } from '../../lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { num } = req.query;
      let itemsQuery;

      if (num === '0') {
        // Fetch all items
        itemsQuery = collection(db, 'items');
      } else {
        // Fetch a limited number of items
        const itemsLimit = parseInt(num, 10);
        itemsQuery = query(collection(db, 'items'), limit(itemsLimit));
      }

      const querySnapshot = await getDocs(itemsQuery);
      const items = querySnapshot.docs.map(doc => doc.data());

      res.status(200).json({ items });
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Error fetching items' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
