import express from 'express';
import fetchUserById from '../controllers/fetchUserById.js';
const userIDRoute = express.Router ();

userIDRoute.get ('/users/:id', fetchUserById);

export default userIDRoute;
