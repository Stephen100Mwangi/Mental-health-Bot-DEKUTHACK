import PropTypes from 'prop-types'
const Button = ({text_Content,bgColor,textColor}) => {
  return (
    <button className={`p-3 px-12 text-white rounded-sm hover:rounded-full bg-${bgColor} bg-button text-${textColor}`}>
      {text_Content}
    </button>
  )
}

Button.propTypes = {
    text_Content: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}

export default Button
