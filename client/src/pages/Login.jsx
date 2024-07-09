import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/users/user";

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading]= useState(false);

    const signIn = async()=>{
      if (!email || !password) {
        toast.error("Email or password cannot be empty")
        
      }
      try {
        setLoading(true)
        const payload = {email,password}
        const response = await fetch("http://localhost:5680/getUser",{
          method: 'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        setLoading(false);

        if (response.status === 200) {
          setLoading(false);
          toast.success("Successful login");
          const loggedUser = data.user;
          dispatch(loginUser({
            username: loggedUser.username,
            email: loggedUser.email,
            loggedIn: true,
            _id: loggedUser._id
          }));
          // Navigate to chat page after login
          // navigate("/chat");
          setTimeout(() => {
            navigate('/chat')
          }, 3000);
        } else {
          toast.error(data.message);
        }
        
      } catch (error) {
        toast.error("Internal server error")
      }
      
    }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex justify-center items-center flex-col shadow-2xl mt-20 rounded-sm bg-card w-fit p-4 space-y-6 min-w-96">
        <div className="flex flex-col justify-start space-y-2 p-2 font-bold text-lg">
        Log In
        </div>
        <Toaster position="top-left"></Toaster>
        <div className="flex flex-col justify-start space-y-2 w-full">
          <label htmlFor="Email">Email</label>
          <input autoCapitalize="off" autoSave="off" autoComplete="off" autoCorrect="off" className="px-6 p-2 rounded-sm outline-none" type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col justify-start space-y-2 w-full">
          <label htmlFor="Password">Password</label>
          <input autoCapitalize="off" autoSave="off" autoComplete="off" autoCorrect="off" className="px-6 p-2 rounded-sm outline-none" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="text-red-500"><Link to='/register'>New Here? Create an account</Link></div>
        <div onClick={signIn}><Button text_Content={loading ? "Loading" : "Log In"}></Button></div>
      </div>
    </div>
  )
}

export default Login
