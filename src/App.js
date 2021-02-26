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
  const [user,setUser]=useState();
  
  let username;
  const login = (username)=>{
    username=username;
    setUser(username)
    islog(!log)
    socket.emit('login',{setUser:username});
  }

      useEffect(() => {
      socket.on('login', (login) => {
      console.log('A Player has logged in!');
      console.log(login);
      setUser(...login.setUser)
    });
  }, []);
 
  if(log && user!=""){
      return (
        <div>
          <div>
          <Board />
        </div>

        </div>
      );
    }
    else{
      return (
        <div>
          <h1>Enter the username:</h1>
          <Login login = {login}/>
        </div>
      );
    }
  
}

export default App;

