import { IoMdSend } from "react-icons/io";
const PeerChat = () => {
  return (
    <div className="flex w-full justify-center items-start h-[85vh] overflow-clip">
      <div className="w-1/4 bg-button border border-t-0 border-l-0 border-r h-[100%]"></div>
      <div className="w-3/4 bg-red-500 h-[100%] relative">
        <div className="absolute bottom-0 flex space-x-5 justify-center items-center p-2 py-0 bg-card w-[100%]">
          <input type="text" placeholder="Send a message" className="p-2 outline-none w-[90%] text-black font-bold bg-card placeholder:text-black"/>
          <IoMdSend className="text-black cursor-pointer"/>
        </div>
      </div>
    </div>
  )
}

export default PeerChat
