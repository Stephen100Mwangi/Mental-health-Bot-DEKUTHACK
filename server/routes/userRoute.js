import express from 'express';
import User from '../models/User.js';

const userRoute = express.Router ();

router.get ('/fetchUsers', async (req, res) => {
  try {
    const users = await User.find ({});
    res.json ({users});
  } catch (error) {
    res.status (500).json ({message: 'Error fetching users'});
  }
});

router.get ('/:id', async (req, res) => {
  try {
    const user = await User.findById (req.params.id);
    if (!user) {
      res.status (404).json ({message: 'User not found'});
    } else {
      res.json ({user});
    }
  } catch (error) {
    res.status (500).json ({message: 'Error fetching user'});
  }
});

export default userRoute;
