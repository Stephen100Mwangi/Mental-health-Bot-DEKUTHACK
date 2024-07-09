/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import logo from '/heart.svg'
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../features/users/user";
import { IoCloseCircle } from "react-icons/io5";
import { useState } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const user = useSelector((state) => state.bot_User.value);
  const loggedIn = user.loggedIn;

  const handleLogOut = () => {
    setDialog(true);
  };

  const confirmLogOut = () => {
    dispatch(logoutUser({ username: "", email: "", loggedIn: false, userID: '' }));
    setDialog(false);
  };

  const dismissLogOut = () => {
    setDialog(false);
  };

  return (
    <div className="flex justify-between items-center p-2 px-8 w-full bg-button relative">
      <Link to='/' className="logo">
        <img src={logo} className="size-20" alt="" />
      </Link>
      <div className="navbar flex justify-center items-center space-x-10 font-normal text-base">
        <p className="hover:underline text-white"><Link to='/chat' className="pb-10">Chat</Link></p>
        <p className="hover:underline text-white"><Link to='/journal' className="pb-10">Journal</Link></p>
        <p className="hover:underline text-white"><Link to='/trackMood' className="pb-10">Track Mood</Link></p>
        <p className="hover:underline text-white"><Link to='/peerChat' className="pb-10">Peer Chat</Link></p>
        <p onClick={handleLogOut} className="hover:underline text-white">
          <Link className="pb-10">{loggedIn ? "Log Out": "Sign In"}</Link>
        </p>
      </div>
      {
        dialog &&(
          <div className="flex flex-col space-y-5 bg-card shadow-2xl rounded-xl p-5  absolute -bottom-48 right-20" role="dialog">
            <div className="w-full flex justify-between items-center">
              <h5 className="font-bold text-base">Are You sure you want to log Out?</h5>
              <IoCloseCircle className="text-2xl text-red-500 cursor-pointer"/>
            </div>
            <div className="modal-body">
              <p className="text-sm font-normal">Logging out will lock you out of our services.</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <button type="button" className="bg-red-500 text-white font-bold p-2 px-6 hover:rounded-full" onClick={confirmLogOut}>Log out</button>
              <button type="button" className="bg-green-500 text-white font-bold p-2 px-6 hover:rounded-full" data-dismiss="modal" onClick={dismissLogOut}>Dismiss</button>
            </div>
          </div>
        )
      }
      
    </div>
  )
}

export default NavBar
