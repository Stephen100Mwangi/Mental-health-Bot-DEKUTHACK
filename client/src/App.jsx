import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import MoodTracker from "./pages/MoodTracker"
import Chats from "./pages/Chats"
import Journal from "./pages/Journal"
import PeerChat from "./pages/PeerChat"
import Resources from "./pages/Resources"
import ProtectedRoute from "./pages/ProtectedRoute"

const App = () => {
  return (
    <div className='w-full flex flex-col min-h-screen bg-card justify-start items-start'>
      <BrowserRouter>
      <NavBar />
      <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route path='' element={<ProtectedRoute></ProtectedRoute>}>
            <Route exact path="/resources" element={<Resources />}></Route>
            <Route exact path="/trackMood" element={<MoodTracker />}></Route>
            <Route exact path="/chat" element={<Chats />}></Route>
            <Route exact path="/journal" element={< Journal/>}></Route>
            <Route exact path="/peerChat" element={<PeerChat />}></Route>
            <Route exact path="/" element={<Home/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
