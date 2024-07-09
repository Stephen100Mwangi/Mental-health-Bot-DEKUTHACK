import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
// import jwt from 'json-web-token'

const createUser = async (req, res) => {
  const {username, email, password, image} = req.body;

  if (!username || !email || !password) {
    res.status (400).send ({message: 'All User inputs must be complete'});
    return;
  }
  const userExists = await Users.findOne ({email});
  if (userExists) {
    res.status (400).send ({message: 'User already exists'});
    return;
  }

  //Create user

  const hashedPassword = await bcrypt.hash (password, 10);

  const newUser = await Users.create ({
    username,
    email,
    password: hashedPassword,
    image,
  });

  if (newUser) {
    //  Generate a JWT Token

    // const id = newUser._id;

    // const token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"30d"});

    res.status (201).send ({message: 'User created successfully'});
    return;
  } else {
    res.status (400).send ({message: 'User creation failed'});
    return;
  }
};

export default createUser;
