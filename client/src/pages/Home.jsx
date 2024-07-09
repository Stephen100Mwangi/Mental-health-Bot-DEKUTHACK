import Button from "../components/Button"
import meditate  from '/meditate.svg'

const Home = () => {
  return (
    <div className='flex space-x-10 px-8 p-12'>
        <div className="w-1/2">
            <img src={meditate} alt="" />
        </div>
          <div className="w-1/2">
          <div className="title text-4xl font-bold mb-4">CalmMind</div>
          <div className="description text-lg font-normal mb-6 leading-loose text-text_color">
            CalmMind is your personal mental health chatbot, designed to provide support and guidance whenever you need it. Whether you&apos;re feeling stressed, anxious, or just need someone to talk to, CalmMind is here to help. Our chatbot offers personalized conversations, coping strategies, and resources to promote mental well-being. Start your journey to a calmer mind today with CalmMind.
          </div>
          <div className="CTA">
            <Button text_Content='See More'></Button>
          </div>
        </div>
      
    </div>
  )
}

export default Home

