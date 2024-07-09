import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from 'socket.io';

import FetchUserRoute from './server/routes/FetchUsers.js';
import loginRouter from './server/routes/LoginUser.js';
import userIDRoute from './server/routes/fetchUserById.js';
import SendMessageRoute from './server/routes/sendMessage.js';
import CreateUserRouter from './server/routes/CreateUser.js';
import chatRoute from './server/routes/chatRoute.js';
import MessageRoute from './server/routes/MessageRouter.js';

dotenv.config ();

const app = express ();
const httpServer = http.createServer (app); // Create HTTP server using Express

// Set up Socket.io server
const io = new Server (httpServer, {
  cors: {
    origin: 'http://localhost:5173', // Allow requests from frontend server
    methods: ['GET', 'POST'],
  },
});

app.use (express.json ());
app.use (cors ());

app.get ('/', (req, res) => {
  return res.status (200).send ('Mind your Mental Wellness');
});

const PORT = process.env.PORT || 6645;

try {
  mongoose.connect (process.env.MONGO_URI).then (response => {
    if (response) {
      console.log ('Connection to DB was successful');
      app.listen (PORT, () => {
        console.log (`App running well on port http://localhost:${PORT}`);
      });
    } else {
      console.log ('Connection to DATABASE failed');
    }
  });
} catch (error) {}

io.on ('connection', socket => {
  console.log ('New client connected');

  socket.on ('joinChat', chatId => {
    socket.join (chatId);
    console.log ('User joined chat:', chatId);
  });

  socket.on ('sendMessage', async ({content, chatId, userId}) => {
    if (!content || !chatId || !userId) {
      return;
    }

    try {
      const message = await Message.create ({
        sender: userId,
        content,
        chat: chatId,
      });

      await Chat.findByIdAndUpdate (chatId, {latestMessage: message});

      io.to (chatId).emit ('message', message);
    } catch (error) {
      console.error ('Error sending message:', error);
    }
  });

  socket.on ('disconnect', () => {
    console.log ('Client disconnected');
  });
});

app.use (CreateUserRouter);
app.use (FetchUserRoute);
app.use (loginRouter);
app.use (userIDRoute);
app.use (SendMessageRoute);
app.use (MessageRoute);
app.use (chatRoute);
