import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const user = useSelector((state)=>state.bot_User.value);
    const loggedIn = user.loggedIn;

  return (
    <div>
        {
            loggedIn ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>
        }
      
    </div>
  )
}

export default ProtectedRoute
