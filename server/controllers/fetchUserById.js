import Users from '../models/Users.js';
import mongoose from 'mongoose';
const fetchUserById = async (req, res) => {
  try {
    const {id} = req.params;
    // console.log (`Received ID: ${id}`);

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid (id)) {
      console.log (`Invalid ID format: ${id}`);
      return res.status (400).json ({message: 'Invalid user ID'});
    }

    const userFound = await Users.findById (id);

    if (!userFound) {
      res.status (404).json ({message: 'Username not found'});
    }
    res.status (200).json ({message: 'User found', user: userFound});
    return userFound;
  } catch (error) {
    console.log ('Error fetching user by id' + error);
  }
};

export default fetchUserById;
