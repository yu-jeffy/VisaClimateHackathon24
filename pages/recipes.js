// pages/recipes.js

import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import styles from '../styles/Recipes.module.css';
import config from '../lib/chatbotConfig';
import MessageParser from '../lib/MessageParser';
import ActionProvider from '../lib/ActionProvider';
import StoreSuggest from '@/components/StoreSuggest';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Recipes = () => {
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

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 3 }}>
                <div className={styles.chatbotContainer}>
                    <div className={styles.chatbotHeader}>Recipe Builder</div>
                    <div className={styles.chatbotBody}>
                        <Chatbot
                            config={config}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            runInitialMessagesWithHistory
                            headerText='VISA Recipe Builder'
                            placeholderText='type a message...'
                        />
                    </div>
                </div>
            </div>
            {
                userData &&
                <div style={{ flex: 1 }}>
                    <StoreSuggest familySize={userData.family_size} annualIncome={userData.annual_income} />
                </div>
            }
        </div>
    );
}

export default Recipes;