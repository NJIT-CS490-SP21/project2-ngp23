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
  const [user,setUser]=useState([]);
  const [tempUser,tempSetUser]=useState("");
  
  let username;
  const login = (username)=>{
    username=username;
    tempSetUser(username)
    islog(!log)
    socket.emit('login',{setUser:username});
  }

      useEffect(() => {
      socket.on('login', (login) => {
      console.log('A Player has logged in!');
      console.log(login);
      setUser(login)
    });
  }, []);
 
  if(log && tempUser!=""){
      return (
        <div >
          <div>
          <h1 class = "txt">Player is </h1>
         {user.map((item) => <p class="txt"> {item}</p>)}
          <Board />
        </div>

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

