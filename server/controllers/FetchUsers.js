import Users from "../models/Users.js"

const fetchUsers = async(req,res)=>{
    const users = await Users.find();
    if (users.length === 0) {
        res.status(200).send("No users in the database")
        return;
    }else{
        res.status(200).json({message:"Users fetched successfully",users:users});
        return;
    }
}

export default fetchUsers