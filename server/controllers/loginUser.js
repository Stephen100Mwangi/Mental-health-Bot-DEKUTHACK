import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res
      .status (400)
      .json ({message: 'Email and password cannot be empty'});
  }

  const userExists = await Users.findOne ({email});

  if (!userExists) {
    return res.status (404).json ({message: 'Invalid credentials.!!'});
  } else {
    const passwordMatch = await bcrypt.compare (password, userExists.password);
    if (!passwordMatch) {
      return res
        .status (400)
        .json ({message: 'User login failed-Invalid credentials'});
    }
    console.log(userExists);
    return res.status(200).json({ message: 'User login was successful', user: userExists });
  }
};

export default loginUser;
