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
  const login = (username)=>{
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
 
  if(log){
      return (
        <div>
          <Board />
          {user}
        </div>
      );
    }
    else{
      return (
        <div>
          <Login login = {login}/>
        </div>
      );
    }
  
}

export default App;

