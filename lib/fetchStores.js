import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchStores = async () => {
    const storesCollection = collection(db, 'stores');
    const storesSnapshot = await getDocs(storesCollection);
    const storesList = storesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return storesList;
};
