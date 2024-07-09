import PropTypes from 'prop-types'
const ChatUser = ({username,email,time,image}) => {
  return (
    <div className="flex justify-start items-center space-x-5">
      <div>
        <img src={image} className="rounded-full size-10" alt="profile" />
      </div>
      <div className="relative flex flex-col space-y-2">
        <div className="font-bold text-base">{username && username}</div>
        <div className="font-light text-base">{email && email}</div>
        <div className="absolute right-1 bottom-1">{time && time}</div>
      </div>
    </div>
  )
}

ChatUser.propTypes = {
    username:PropTypes.string,
    email:PropTypes.string,
    time:PropTypes.string,
    image:PropTypes.string
}

ChatUser.defaultProps = {
    username:"",
    email:"",
    time:"",
    image:""
}

export default ChatUser
