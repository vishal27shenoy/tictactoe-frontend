import React, { useState } from "react";
import "./joinroom.css";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoinRoom = () => {
  const navigate = useNavigate();
  const route = useLocation().state;
  const [id, setId] = useState("");
  const handleCreate = async () => {
    console.log(id);
    if(id.trim().length == 0){
      toast.error(`Enter valid room id`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
    }
    try {
      const response = await axios.post(
        "https://tictactoe-stz8.onrender.com/createRoom",
        { roomID: id }
      );
      console.log(response);
      if (response.data.status == 200) {
        navigate(`/gameboard/${id}/${1}`);
      } else {
        toast.error(`${response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleJoin = async () => {
    if(id.trim().length == 0){
      toast.error(`Enter valid room id`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
    }
    try {
      const response = await axios.put(
        "https://tictactoe-stz8.onrender.com/joinRoom",
        { roomID: id }
      );
      console.log(response);
      if (response.data.status == 200) {
        navigate(`/gameboard/${id}/${2}`);
      } else {
        toast.error(`${response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="joinroomContainer">
      <ToastContainer/>
      <input
        type="text"
        className="inputHolder"
        placeholder="Enter room Id"
        maxLength={4}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className="joiningBtn"
        onClick={() => (route.data == "create" ? handleCreate() : handleJoin())}
      >
        {route.data}
      </button>
    </div>
  );
};

export default JoinRoom;
