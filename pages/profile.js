import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import router from 'next/router';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [txHistory, setTxHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'user_profiles', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);
          setTxHistory(userData.tx_history);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (!user) {
    router.push('/login');
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Profile</h1>
      {userData && (
        <div className={styles.profileInfo}>
          <p>Email: {userData.email}</p>
          <p>Annual Income: ${userData.annual_income}</p>
          <p>Family Size: {userData.family_size}</p>
          <p>Points Current Month: {userData.points_current_month}</p>
          <p>Points Lifetime: {userData.points_lifetime}</p>
        </div>
      )}
      <h2 className={styles.title}>Transaction History</h2>
      {txHistory.length > 0 ? (
        <div className={styles.transactionHistory}>
          {txHistory.map((tx) => (
            <div key={tx.tx_id} className={styles.transactionItem}>
              <p>Store: {tx.name_id}</p>
              <p>Amount: ${tx.amount}</p>
              <p>Claimed: {tx.claimed ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No transaction history.</p>
      )}
    </div>
  );
}
