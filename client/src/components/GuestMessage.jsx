import PropTypes from 'prop-types'
const GuestMessage = ({message,time}) => {
  return (
    <div className='flex justify-end items-end'>
        <div className="flex flex-col space-y-3 p-4 px-12 justify-center items-center w-96 justify-self-end rounded-tr-[40px] rounded-br-[0px] rounded-tl-[50px] rounded-bl-[50px] text-white bg-button">
            <div className='text-base font-medium'>{message}</div>
            <div className='text-xs font-black font-mono flex justify-end w-full'>{time}</div>
       </div>
    </div>
    
  )
}

GuestMessage.propTypes = {
    message: PropTypes.string,
    time: PropTypes.string
}
export default GuestMessage
