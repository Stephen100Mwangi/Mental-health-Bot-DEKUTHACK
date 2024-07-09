import { useEffect, useState } from 'react';
import ResourceCard from '../components/ResourceCard'
import toast, { Toaster } from 'react-hot-toast';

const Resources = () => {

  const [resources,setResources] = useState([]);

  useEffect(()=>{
    try {
      fetch("http://localhost:8800/MentalHospitals").then(response =>{
        if (!response.ok) {
          toast.error("Error locating resources")
        }else{
          return response.json();
        }
      }).then(data =>{
        if (data.length === 0) {
          toast.error("Resources are currently unavailable")
        }else{
          setResources(data)
        }
      })
    } catch (error) {
      toast.error("Error retrieving Resources" + error)
    }
  },[])
  
  return (
    <div className='flex flex-col justify-center items-center p-8'>
      <Toaster position='top-left'></Toaster>
      <div className='text-2xl my-10 text-center font-bold'>Don&apos;t Suffer Silently <span className='text-button'>Reach Out to Theses experts.</span>  A problem shared is half solved.</div>
      <div className='grid grid-cols-3 justify-center items-center gap-16'>
      {
        resources.map(resourceItem => (<ResourceCard key={resourceItem.id} id={resourceItem.id} title={resourceItem.name} link={resourceItem.link} resourceType={resourceItem.description} logo={resourceItem.logo}></ResourceCard>))
      }
      </div>
      
      
    </div>
  )
}

export default Resources
