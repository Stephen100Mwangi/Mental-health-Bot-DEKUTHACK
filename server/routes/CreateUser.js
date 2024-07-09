import express from 'express';
import createUser from '../controllers/createUser.js';
const CreateUserRouter = express.Router ();
CreateUserRouter.post ('/createUser', createUser);

export default CreateUserRouter;
