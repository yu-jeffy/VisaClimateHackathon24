// chatbotConfig.js

import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
    botName: "GPT",
    initialMessages: [createChatBotMessage("Hi, I am a recipe building assistant. I can help you build meals that are nutritious, delicious, and sustainable. You can also ask me about information related to sustainability. How can I help you today?")]
};

export default config;


