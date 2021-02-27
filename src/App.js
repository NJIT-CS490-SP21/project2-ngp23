import logo from './logo.svg';
import './App.css';
import { ListItem } from './ListItem.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Board } from './Board.js';
import {Login} from './Login.js';

const socket = io(); // Connects to socket connection

function App() {
  const [log,islog]=useState(false);

  const [tempUser,tempSetUser]=useState("");
  
  const login = (username)=>{
    tempSetUser(username)
    islog((log)=>{return !log;})
    socket.emit('login',{setUser:username});
  }

  if(log && tempUser!=""){
      return (
        <div >
        <Board tempUser={tempUser}/>
        </div>
      );
    }
    else{
      return (
       
        <div >
          <h1 class="txtCenter">Enter the username:</h1>
          <Login login = {login}/>
          
        </div>
      );
    }
  
}

export default App;

