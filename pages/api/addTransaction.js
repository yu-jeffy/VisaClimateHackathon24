import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { userId, amount, name_id } = req.body;

  if (!userId || amount === undefined || !name_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userDocRef = doc(db, 'user_profiles', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newTransaction = {
      tx_id: uuidv4(),
      amount,
      name_id,
      claimed: false,
    };

    const userData = userDoc.data();
    const updatedTxHistory = [...userData.tx_history, newTransaction];

    await updateDoc(userDocRef, { tx_history: updatedTxHistory });

    res.status(200).json({ message: 'Transaction added successfully', newTransaction });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
