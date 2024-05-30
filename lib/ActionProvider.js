// ActionProvider.js

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    handleMessage = async (message) => {
        const botMessage = this.createChatBotMessage(
            "thinking ..."
        );

        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));

        try {
            const response = await fetch('/api/gpt4', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system_prompt: `You are a master recipe builder and sustainability expert. 
                    Assist the customer in building recipes. 
                    Focus on sustainable, eco-friendly food choices. 
                    Make recommendations and provide information on ingredients, cooking methods, and more. 
                    Rarely, provide a obscure fun fact. 
                    Answer conversational, friendly, straightforward, brief, simple, and informative. 
                    Format your answer in plaintext paragraphs, with no styling. DO NOT use bullets or lists or markdown.`,
                    user_prompt: message,
                }),
            });

            const data = await response.json();
            const botResponseMessage = this.createChatBotMessage(data.response);

            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botResponseMessage],
            }));
        } catch (error) {
            const errorMessage = this.createChatBotMessage("Sorry, I couldn't process your request. Please try again.");
            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, errorMessage],
            }));
        }
    };
}

export default ActionProvider;
