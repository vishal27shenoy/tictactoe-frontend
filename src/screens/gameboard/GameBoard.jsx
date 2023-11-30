import React , {useState,useEffect} from 'react'
import './gameboard.css';
import {io} from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { flushSync } from 'react-dom';
// const socket = io("http://localhost:5000");
const win = [[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
]
let turnn = "X";
let arr = [0,0,0,0,0,0,0,0,0];
const GameBoard = () => {
    const socket = io("https://tictactoe-stz8.onrender.com");
    const {roomId,userId} = useParams();
    const playerId = roomId+userId;
    const [change,setChange] = useState(false);
    const [check,setCheck] = useState(false);


    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket");
              socket.emit("users-connect",{roomId:roomId,userId:playerId})
        });
    },[]);


    useEffect(() => {
        socket.on(roomId,(object) => {
            const { userId, index, value, turn,message } = object;
            if(message){
                turnn="X";
                arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                setCheck(false);
                setChange((prev) => !prev);
            }else{
                arr[index] = value;
                setChange((prev) => !prev);
                turnn = turn;
                checkWin();
            }
        });
    },[]);


    

    const checkWin = () => {
        for (const element of win) {
        let [a, b, c] = element;
        if (arr[a || b || c] != 0 && arr[a] === arr[b] && arr[b] === arr[c]) {
            toast(`${arr[a]} Won a Game`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setCheck(true);
          return;
        }
    }
        if (!arr.includes(0)) {
               toast("Game Draw", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setCheck(true);
        }

        
    }
    const handleClick = (index) => {
        if(check){
            return;
        }else if(turnn == 'X' && userId == 1){
            socket.emit("ongame",{roomId:roomId,userId:playerId,turn:'O',value:'X',index:index});
        }else if(turnn == 'O' && userId == 2){
                socket.emit("ongame",{roomId:roomId,userId:playerId,turn:'X',value:'O',index:index});     
        }
    }

    // useEffect(() => {},[change,arr])

    const handelReset = () => {
        socket.emit("playagain",{roomId:roomId,turm:'X'});
        setCheck(false);
    }
  return (
    <div className='gameboardContainer'>
        <ToastContainer style={{ textAlign: 'left', padding: '0', fontSize: '14px' ,color:'black'}}/>
        <div className="boardContainer">
        {
            arr.map((item,index) =>{
                console.log(item)
                return (<div className='boardBox' id={`${item == 'X' ? 'x' : 'o'}`} key={index} onClick={() => item === 0 && handleClick(index)}>{item != 0 && item}</div>)
            })
        }
        </div>
        {check  && <button className='playAgainBtn' onClick={() => handelReset()}>Play Again</button>}
    </div>
  )
}

export default GameBoard


// toast(`${board[a]} Won a Game`, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
// });

// if (!board.includes(0)) {
//     //    toast("Game Draw", {
//     //     position: "top-right",
//     //     autoClose: 5000,
//     //     hideProgressBar: false,
//     //     closeOnClick: true,
//     //     pauseOnHover: true,
//     //     draggable: true,
//     //     progress: undefined,
//     //     theme: "dark",
//     // });
//     setCheck(true);
// }
