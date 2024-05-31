import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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
        console.log(`Fetching store with name_id: ${name_id}`);
        
        // Fetch the store document using name_id as the document ID
        const storeDocRef = doc(db, 'stores', name_id);
        const storeDoc = await getDoc(storeDocRef);

        if (!storeDoc.exists()) {
            console.error(`Store with name_id ${name_id} not found`);
            return res.status(404).json({ error: 'Store not found' });
        }

        const storeData = storeDoc.data();

        const userDocRef = doc(db, 'user_profiles', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userDoc.data();
        const txHistory = userData.tx_history;

        console.log(`Searching for transaction with amount: ${amount} and name_id: ${name_id}`);
        const transactionIndex = txHistory.findIndex(tx => tx.amount === amount && tx.name_id === name_id && !tx.claimed);

        if (transactionIndex === -1) {
            console.log(`No matching transaction found or already claimed`);
            return res.status(400).json({ error: 'No matching transaction found or already claimed' });
        }

        const pointsToAdd = amount * storeData.eco_rating * 0.01;

        txHistory[transactionIndex].claimed = true;

        await updateDoc(userDocRef, {
            tx_history: txHistory,
            points_current_month: (userData.points_current_month || 0) + pointsToAdd,
            points_lifetime: (userData.points_lifetime || 0) + pointsToAdd
        });

        res.status(200).json({ message: 'Transaction claimed and points added successfully', pointsToAdd });
    } catch (error) {
        console.error('Error claiming transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
