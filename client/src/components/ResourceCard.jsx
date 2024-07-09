import PropTypes from 'prop-types'

const ResourceCard = ({title,link,resourceType,id}) => {
  return (
    <div className='flex flex-col space-y-8 justify-center space-x-10 w-80 min-h-64 items-center px-5 p-4 rounded-lg shadow-lg'>
      
      <div className='flex justify-between w-full'>
        <div className='text-xs font-bold'>{id}</div>
        {/* <div className='flex justify-center items-center'><img src={logo} className="w-14 h-14 object-cover" alt={logo}></img></div> */}
      </div>
      <div className='flex flex-col space-y-5 w-full'>
        <div className="text-xl font-bold">{title}</div>
        <div className="text-base font-light">{resourceType}</div>
        <div className="font-normal text-sm text-blue-500"><a href={link} target='_blank' rel='noopener noreferrer'>View Resource</a></div>
      </div>
    </div>
  )
}

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
}

export default ResourceCard
