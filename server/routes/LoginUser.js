import express from 'express';
import loginUser from '../controllers/loginUser.js';

const loginRouter = express.Router ();
loginRouter.post ('/getUser', loginUser);

export default loginRouter;
