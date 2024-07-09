import express from 'express';
import chatUser from '../controllers/chatUser.js';

const chatRoute = express.Router ();

chatRoute.post ('/chats', chatUser);

export default chatRoute;
