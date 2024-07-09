import express from 'express'
import fetchUsers from '../controllers/FetchUsers.js';

const FetchUserRoute = express.Router();
FetchUserRoute.get("/users/fetchUsers",fetchUsers);

export default FetchUserRoute