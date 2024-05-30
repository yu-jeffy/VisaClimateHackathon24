// MessageParser.js

class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        console.log(message);
        this.actionProvider.handleMessage(message);
    }
}

export default MessageParser;
