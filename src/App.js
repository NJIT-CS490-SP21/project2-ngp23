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
  //const [user,setUser]=useState({});
  let [user, setUser] = useState({ "X": "", "O": "", "spec": [] })
  const [tempUser,tempSetUser]=useState("");
  
  const login = (username)=>{
    tempSetUser(username)
    islog((log)=>{return !log;})
    socket.emit('login',{setUser:username});
  }

  useEffect(() => {
      socket.on('login', (login) => {
      console.log('A Player has logged in!');
      console.log(login);
      Object.keys(login).map((item) => {
                console.log(item, login[item])
               setUser((prev) => ({
                    ...prev,
                    [item]: login[item]
                }))
            })
    });
  }, []);
 
  if(log && tempUser!=""){
      return (
        <div >
          <h1 class = "txt">Player is </h1>
          <div class = "txt">
          <p>Player X is : {user["X"]}</p>
          <p>Player O is : {user["O"]}</p>
          <p>Spectators</p>
          {user['spec'].map((player, i) => <p>{player}</p>)}
        </div>
        <Board />
        
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

