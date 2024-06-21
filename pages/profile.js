import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [txHistory, setTxHistory] = useState([]);
  const router = useRouter();

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
          <p><span>Email:</span> {userData.email}</p>
          <p><span>Annual Income:</span> ${userData.annual_income}</p>
          <p><span>Family Size:</span> {userData.family_size}</p>
          <p><span>Points Current Month:</span> {userData.points_current_month}</p>
          <p><span>Points Lifetime:</span> {userData.points_lifetime}</p>
        </div>
      )}
      <h2 className={styles.title}>Transaction History</h2>
      {txHistory.length > 0 ? (
        <div className={styles.transactionHistory}>
          {txHistory.map((tx) => (
            <div key={tx.tx_id} className={styles.transactionItem}>
              <p><span>Store:</span> {tx.name_id}</p>
              <p><span>Amount:</span> ${tx.amount}</p>
              <p><span>Claimed:</span> {tx.claimed ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No transaction history.</p>
      )}
    </div>
  );
}
