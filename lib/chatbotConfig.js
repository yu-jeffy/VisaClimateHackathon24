// lib/chatbotConfig.js

import { createChatBotMessage } from 'react-chatbot-kit';
import ChatBotAvatar from '../components/ChatBotAvatar'; // import your custom avatar component

const config = {
    botName: "GPT",
    initialMessages: [createChatBotMessage("Hi, I am a recipe building assistant. I can help you build meals that are nutritious, delicious, and sustainable. You can also ask me about information related to sustainability. How can I help you today?")],
    customComponents: {
        botAvatar: (props) => <ChatBotAvatar {...props} />, // use your custom avatar component
    },
};

export default config;