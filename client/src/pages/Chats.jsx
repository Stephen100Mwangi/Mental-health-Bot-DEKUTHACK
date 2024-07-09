import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { Toaster } from "react-hot-toast";
import ChatUser from '../components/ChatUser';
import userImage from '/user.svg'
import io from 'socket.io-client';
import { IoIosSearch, IoMdPerson, IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import ChatMessage from "../components/ChatMessage";
import GuestMessage from "../components/GuestMessage";

const socket = io('http://localhost:8000');
const Chats = () => {

  // const [userCount,setCount] = useState(0);
  const [chatUsers,setUsers] = useState([]);
  const [searchTerm,setTerm] = useState("");
  const loggedInUser = useSelector((state)=>state.bot_User.value)
  const [guestName,setGuest] = useState("");
  const [messageSent,setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentChatID, setCurrentChatID] = useState(null);
  // const maskString = (str) => {
  //   return str.split('').map(() => '*').join('');
  // };

  useEffect(()=>{
    fetch("http://localhost:5680/users/fetchUsers").then(response =>{
      if (!response.ok) {
        toast.error("Response unsuccessful")
      }else{
        return response.json();
      }
    })
    .then(data =>{
      setUsers(data.users.filter(x => x.email !== loggedInUser.email));
    })
    .catch(error => {
        toast.error("An error occurred");
        console.error("Error fetching users:", error);
      });

  });

  useEffect(()=>{
    fetch("http://localhost:5680/users/fetchUsers").then(response =>{
      if (!response.ok) {
        toast.error("Response unsuccessful")
      }else{
        return response.json();
      }
    })
    .then(data =>{
      
      setUsers(data.users.filter(x => x.username.includes(searchTerm)));
    })
    .catch(error => {
        toast.error("An error occurred");
        console.error("Error fetching users:", error);
      });

  },[searchTerm])

  const selectPeer = async (id)=>{
    console.log("user " + id + " clicked");
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5680/users/${id}`);
      if (!response.ok) {
       console.log("Response not found");
      }else{
        const data = await response.json();
        setGuest(data.user.username);
        createOrLoadChat([loggedInUser._id, id]);
      }
      
    } catch (error) {
      toast.error("No such user")
    }
  }

  const createOrLoadChat = async (userIds) => {
    try {
      const response = await fetch('http://localhost:5680/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds }),
      });

      if (!response.ok) {
        toast.error('Failed to create or load chat');
      } else {
        const data = await response.json();
        setCurrentChatID(data.chat._id);
        socket.emit('joinChat', data.chat._id);
        fetchMessages(data.chat._id);
      }
    } catch (error) {
      toast.error('An error occurred while creating or loading chat');
      console.error('Error creating or loading chat:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:5680/chats/${chatId}/messages`);
      if (!response.ok) {
        toast.error('Failed to fetch messages');
      } else {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error('An error occurred while fetching messages');
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageSent.trim() || !currentChatID) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5680/messages/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: messageSent, chatID: currentChatID }),
      });

      if (!response.ok) {
        toast.error('Failed to send message');
      } else {
        const data = await response.json();
        setMessages([...messages, data]);
        setMessage('');
        toast.success("Message sent successfully")
      }
    } catch (error) {
      toast.error('An error occurred while sending message');
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="flex w-full items-start justify-start h-[85vh] overflow-clip">
      <div className="flex flex-col space-y-5 h-[100%] overflow-clip p-2 bg-button">
        <Toaster position="top-left"></Toaster>
        <div className="w-full flex justify-center items-center bg-white px-4"><input placeholder="Search to start chat" type="text" value={searchTerm} onChange={(e)=>setTerm(e.target.value)} className="p-2 px-0 rounded-sm outline-none" /><IoIosSearch /></div>
        <div className="w-full h-[90%] overflow-scroll px-0 no-scrollbar">
          {chatUsers.map(user => (
              <div className="my-4 border-b py-2 cursor-pointer hover:border-red-500" key={user._id} onClick={()=>selectPeer(user._id)} >
                <ChatUser username={user.username} email={user.email} time={user.time} image={userImage} />
              </div>
          ))}
        </div>
      </div>
      <div className="h-[100%] p-2 bg-card relative overflow-clip">
        <div className="flex items-center space-x-20 justify-between px-8">
          <div className="flex items-center justify-center space-x-5">
            <div><IoMdPerson className="text-button text-2xl"/></div>
            <div className="flex flex-col justify-start items-start">
              <div>{loggedInUser.username}</div>
              <div>{loggedInUser.email}</div>
            </div>
          </div>
          <div>
            <p>Chatting with {guestName}</p>
          </div>
        </div>
         <div className="p-4 flex flex-col space-y-3 h-[calc(100% - 80px)] overflow-y-auto">
          {messages.map((message) => (
            <div key={message._id}>
              {message.sender._id === loggedInUser._id ? (
                <ChatMessage message={message.content} time={new Date(message.createdAt).toLocaleTimeString()} />
              ) : (
                <GuestMessage message={message.content} time={new Date(message.createdAt).toLocaleTimeString()} />
              )}
            </div>
          ))}
        </div>
        <div className="absolute border-t border-gray-300 bottom-0 flex items-center p-2 bg-white w-full">
          <input
            type="text"
            value={messageSent}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
            className="p-2 px-4 rounded-md outline-none w-full"
          />
          <IoMdSend className="text-blue-500 cursor-pointer ml-2" onClick={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export default Chats
