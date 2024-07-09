import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {

    const [username,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm_password,setConfirmationPassword] = useState();
    const navigate = useNavigate();

    const signUp = async()=>{
      if (!username || !email || !password || !confirm_password) {
        toast.error("All fields must be complete")
      }

      if (password !== confirm_password) {
        toast.error("Password must match confirm password")
      }

      const payload = {username,email,password}
      try {
            fetch("http://localhost:5680/createUser",{
              method: 'POST',
              headers:{
                    'Content-Type':'application/json'
              },
              body: JSON.stringify(payload),
              }).then(response =>{
              if (!response.ok) {
                console.log("Response failed");
                toast.error("Error creating user")
              }else{
                console.log(response);
                if (response.message === "User already exists") {
                  toast.error("User already exists");
                  return;
                }
                if (response.message === "User created successfully") {
                  toast.success("User created successfully");
                  return;
                }

                setInterval(()=>{
                  navigate('/login');
                },[3000])
              }
            })
          } catch (error) {
            toast.error("Oops!!Internal server error. Hang Tight")
      }
    }
   

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex justify-center items-center flex-col mt-20 shadow-2xl rounded-lg mb-20 bg-card w-fit p-4 pt-2 space-y-6 min-w-96">
        <div className="flex flex-col justify-start space-y-2 p-2 font-bold text-lg">
        Sign Up
        </div>
        <Toaster position="top-left"/>
        <div className="flex flex-col justify-start space-y-2 w-full">
          <label htmlFor="Username">Username</label>
          <input autoCapitalize="off" autoCorrect="off" autoComplete="off" autoSave="off" className="px-6 p-2 rounded-sm outline-none" type="text" id="username" value={username} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="flex flex-col justify-start space-y-2 w-full">
          <label htmlFor="Email">Email</label>
          <input autoCapitalize="off" autoCorrect="off" autoComplete="off" autoSave="off" className="px-6 p-2 rounded-sm outline-none" type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col justify-start space-y-2 w-full">
          <label htmlFor="Password">Password</label>
          <input autoCapitalize="off" autoCorrect="off" autoComplete="off" autoSave="off" className="px-6 p-2 rounded-sm outline-none" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="flex flex-col justify-start space-y-2 w-full">
          <label htmlFor="Confirm Password">Confirm Password</label>
          <input autoCapitalize="off" autoCorrect="off" autoComplete="off" autoSave="off" className="px-6 p-2 rounded-sm outline-none" type="password" id="confirm_password" value={confirm_password} onChange={(e)=>setConfirmationPassword(e.target.value)}/>
        </div>
        <div className="my-3 text-green-500"><Link to='/login'>Already have an account</Link></div>
        <div onClick={signUp}><Button text_Content='Sign Up'></Button></div>
      </div>
    </div>
  )
}

export default Register
