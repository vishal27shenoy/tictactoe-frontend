import React from 'react'
import './home.css'
import {useNavigation,useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  const handleNavigation = (value) => {
     navigate('/joinroom', { state: { data: value } });
  }
  return (
    <div className='homeContainer'>
        <button className='createBtn' onClick={() => handleNavigation("create")}>Create Room</button>
        <button className='joinBtn' onClick={() => handleNavigation("join")}>Join Room</button>
    </div>
  )
}

export default Home