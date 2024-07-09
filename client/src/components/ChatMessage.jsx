import PropTypes from 'prop-types'
const ChatMessage = ({message,time}) => {
  return (
    <div className="relative flex flex-col space-y-3 p-4 px-12 justify-center items-center w-96 rounded-tl-[40px] rounded-bl-[0px] rounded-tr-[50px] rounded-br-[50px] text-white bg-green-500">
      <div className='text-base font-medium'>{message}</div>
      <div className='text-xs font-black font-mono flex justify-end w-full'>{time}</div>
    </div>
  )
}

ChatMessage.propTypes = {
    message: PropTypes.string,
    time: PropTypes.string
}
export default ChatMessage
