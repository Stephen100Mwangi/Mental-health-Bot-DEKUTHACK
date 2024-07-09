import express from 'express';
import sendMessage from '../controllers/sendMessage.js';
const SendMessageRoute = express.Router ();

SendMessageRoute.post ('/messages/chat', sendMessage);

export default SendMessageRoute;
