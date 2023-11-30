import logo from './logo.svg';
import './App.css';
import GameBoard from './screens/gameboard/GameBoard';
import Home from './screens/home/Home';
import JoinRoom from './screens/join room/JoinRoom.jsx'
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/joinroom" element={<JoinRoom/>}/>
        <Route path="/gameboard/:roomId/:userId" element={<GameBoard/>}/>
      </Routes>
  );
}

export default App;
