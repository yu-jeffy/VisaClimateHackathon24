import { db } from '../../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Construct the path to the JSON file
    const jsonFilePath = path.join(process.cwd(), 'data', 'stores.json');

    // Read the JSON file
    const fileContents = await fs.readFile(jsonFilePath, 'utf-8');
    const storesData = JSON.parse(fileContents);

    const storesCollection = collection(db, 'stores');

    // Upload each store to Firestore
    const uploadPromises = storesData.map(store => {
      const storeDoc = doc(storesCollection, store.name_id);
      return setDoc(storeDoc, {
        eco_rating: store['eco-rating'],
        name_display: store.name_display,
        online: store.online,
      });
    });

    await Promise.all(uploadPromises);

    res.status(200).json({ message: 'Stores uploaded successfully' });
  } catch (error) {
    console.error('Error uploading stores:', error);
    res.status(500).json({ error: 'Error uploading stores' });
  }
}
