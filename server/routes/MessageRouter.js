import express from 'express';
import updateMessage from '../controllers/updateMessage.js';

const MessageRoute = express.Router ();

MessageRoute.get ('/chats/:chatId/messages', updateMessage);

export default MessageRoute;
