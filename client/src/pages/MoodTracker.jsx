import { useState } from "react"
import Button from "../components/Button"
import care from '/care.svg'
import sad from '/sad.svg'
import happy from '/happy.svg'

import { Toaster } from 'react-hot-toast'
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const MoodTracker = () => {
  const [image,setImage] =useState(care);
  const [message,setMessage] = useState("We are a listening ear");
  const [feelings,setFeelings] = useState("");
  const [isSad,setIsSad] = useState(false);
  const words = [
      "unhappy", 
      "bad",
      "sorrowful",
      "dejected",
      "unhappy",
      "sorrowful",
      "dejected",
      "regretful",
      "depressed",
      "downcast",
      "miserable",
      "downhearted",
      "down",
      "despondent",
      "despairing",
      "disconsolate",
      "out of sorts",
      "desolate",
      "bowed down",
      "wretched",
      "glum","gloomy",
      "doleful",
      "dismal",
      "blue",
      "melancholy",
      "melancholic",
      "low-spirited",
      "mournful",
      "woeful",
      "woebegone",
      "forlorn",
      "crestfallen",
      "broken-hearted",
      "heartbroken",
      "inconsolable",
      "grief-stricken",
      "down in the mouth",
      "down in the dumps"
];

const happyWords = [
      "contented",
      "content",
      "cheerful",
      "cheery",
      "merry",
      "joyful",
      "jovial",
      "jolly",
      "joking",
      "jocular",
      "gleeful",
      "carefree",
      "untroubled",
      "delighted",
      "smiling",
      "beaming",
      "grinning",
      "glowing",
      "satisfied",
      "gratified",
      "buoyant",
      "radiant",
      "sunny",
      "blithe",
      "joyous",
      "beatific",
      "blessed",
      "cock-a-hoop",
      "in good spirits",
      "in high spirits",
      "in a good mood",
      "light-hearted",
      "good-humoured",
      "thrilled",
      "exuberant",
      "elated",
      "exhilarated",
      "ecstatic",
      "blissful",
      "euphoric",
      "overjoyed",
      "exultant",
      "rapturous",
      "rapt",
      "enraptured",
      "in seventh heaven",
      "on cloud nine",
      "over the moon",
      "walking on air",
      "beside oneself with joy",
      "jumping for joy",
      "chirpy",
      "on top of the world",
      "as happy as a sandboy",
      "tickled pink",
      "tickled to death",
      "gassed",
      "like a dog with two tails",
      "as pleased as Punch",
      "on a high",
      "blissed out",
      "sent",
      "chuffed",
      "as happy as Larry",
      "made up",
      "as happy as a clam",
      "wrapped",
      "gay",
      "blithesome",
      "jocose",
      "jocund"
]

  const trackMood = ()=>{
    if (feelings.trim().length === 0) {
      toast.error("You must provide you feelings")
    }

    // Check if any sad word is present in the feelings
    const isFeelingSad = words.some(word => feelings.toLowerCase().includes(word));

    // Check if any happy word is present in the feelings
    const isFeelingHappy = happyWords.some(word => feelings.toLowerCase().includes(word));

    if (isFeelingSad) {
      toast.custom("Seems you are sad.");
      setMessage("Seems you are sad");
      setImage(sad);
      setIsSad(true);
    } else if (isFeelingHappy) {
      toast.custom("Seems you are happy.");
      setMessage("Good to see you are happy");
      setImage(happy);
      setIsSad(false);
    } else {
      // Reset to default state if neither sad nor happy words are found
      setMessage("We are a listening ear");
      setImage(care);
      setIsSad(false);
    }
  };


    
  return (
    <div id="journal" className="w-[90vw] flex justify-center space-x-20 items-center px-8 py-20">
      <div className="w-96 flex flex-col space-y-3 justify-center items-center">
        <Toaster position="top-left"></Toaster>
        <textarea value={feelings} onChange={(e)=>setFeelings(e.target.value)} name="" id="" cols={40} rows={10} autoFocus className="outline-none rounded-sm p-2" placeholder="How are you today? Speak Out."></textarea>
        <div onClick={trackMood}><Button text_Content='Submit'></Button></div>
      </div>
      <div className="w-96 p-4 min-h-80 h-fit border flex flex-col justify-center items-center space-y-3 shadow-2xl rounded-lg">
        <p className="text-2xl text-center font-light">We are Listening. <br /> Let us <span className="text-button">track</span> your mood</p>
        <img className='size-48' src={image} alt="" />
        <p>{message}</p>
        {
          isSad && (<Link to='/resources' className="bg-green-500 text-white px-8 p-2 hover:rounded-full">Get Help</Link>)
        }
        
      </div>
    </div>
  )
}

export default MoodTracker
