import { db } from '../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            // Check if the email already exists in the users collection
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Create a new user_tx document with an empty transaction history
            await addDoc(collection(db, 'user_tx'), {
                email,
                tx_history: [],
            });

            res.status(200).json({ message: 'User and transaction document created successfully' });
        } catch (error) {
            console.error('Error creating user and transaction document:', error); // Log error to server console
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
