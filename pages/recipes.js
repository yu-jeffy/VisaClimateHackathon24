// pages/recipes.js

import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import styles from '../styles/Recipes.module.css';

import config from '../lib/chatbotConfig';
import MessageParser from '../lib/MessageParser';
import ActionProvider from '../lib/ActionProvider';

const Recipes = () => {
    return (
        <div>
            <div className={styles.chatbotContainer}>
                <div className={styles.chatbotHeader}>Recipe Builder</div>
                <div className={styles.chatbotBody}>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
            </div>
        </div>
    );
};

export default Recipes;
