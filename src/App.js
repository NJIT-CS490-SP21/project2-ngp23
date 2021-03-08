
import './App.css';

import { useState} from 'react';
import io from 'socket.io-client';
import { Board } from './Board.js';
import {Login} from './Login.js';

const socket = io(); // Connects to socket connection

function App() {
  const [login,islogin]=useState(false);
  const [tempUser,tempSetUser]=useState("");
 
  const tempLogin = (username)=>{
    tempSetUser(username)
    islogin((login)=>{return !login;})
    console.log(username);
    socket.emit('login',{setUser:username});
    
    socket.emit('leaderboard');
  }
      if(!login && tempUser === "")
      {
        return (
        <div >
          <h1 class="txtCenter">Enter the username:</h1>
          <Login login = {tempLogin}/>
        </div>
      );
      }else
      {
        return (
        <div >
          <p class = "txtNext">Your user Name is : {tempUser}</p>
          <Board tempUser={tempUser}/>
        </div>
      );
      }

}

export default App;

