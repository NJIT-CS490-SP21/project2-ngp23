//imports all needed libraries
import React from 'react';
import './Board.css';
import { useState, useRef, useEffect,dispatch } from 'react';
import { BoardMake } from './BoardMake.js'
import io from 'socket.io-client';
import { Winner } from './Winner.js'

const socket = io(); // Connects to socket connection
export function Board({tempUser}) {
    //setup the state
    const [board, setBoard] = useState(Array(9).fill(null));
    let [user, setUser] = useState({ "X": "", "O": "", "spec": [] })
    //const to checl the state.
    const [state2, setState2] = useState(1);
    

    //onclick button function
    function onClickButton(index) {
        //variable to store the targer innerHtml
        let userClick
        userClick=[...board];
        //If statement checks if the box is empty or not if empty then only procide.
        if (!userClick[index]) {
            if(tempUser === user["X"]){
            //if state is 1 then its gives X as value
            if (state2 === 1) {
               userClick[index] = "X";
                //changes the state to 0 for the O in next box
                setState2(0);
                setBoard(userClick);
        socket.emit('click', { userClick: userClick,setState2:state2});
            }
            else{alert("wait for your turn")}
                
            }
            else if(tempUser===user["O"]){
                //O value is printed out
                if(state2===0){
                userClick [index] = "O";
                //changes the state to 1 for the x in next box
                setState2(1);
                setBoard(userClick);
        socket.emit('click', { userClick: userClick,setState2:state2});
                }else{alert("wait for your turn")}
            } 
                    
            else{alert("Game in progress!")}
        
          
        } else{alert("Invalid box")}

       
    }

    useEffect(() => {
    socket.on('click', (data) => {
      console.log('Click event received!');
      console.log(data);
      
      setBoard([...data.userClick]);
      if(data.setState2===0){
        setState2(1);
      }else{setState2(0);}
      
    });
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
        socket.on('reset', (data) => {
      console.log('rest event received!');
      console.log(data);
      
      setBoard([...data.userClick]);
      if(data.setState2===0){
        setState2(1);
      }else{setState2(0);}
      
    });
  }, []);
  
  
    let status;
    const winner = Winner(board);
    
    if(winner)
    {
        status = `winner is ${winner}`;
        
    }else
    {
        status= `Next Player: ${(state2 === 1)?"X":"O"}`;
    }

    const reset=()=>
    {
        let userClick;
        userClick = [...board];
        userClick.fill(null);
        setBoard(userClick);
        if(state2===0){
            setState2(1);
      }else{setState2(0);}
        socket.emit('reset', { userClick: userClick,setState2:state2});
    }

    return (
        //renders to the BoardMake.js 
        
        <div>
        <p class ="txtNext" >{status}<br/></p>
        <div ><button class ="buttonR" onClick={reset} type="button">reset</button></div>
        <h1 class = "txt">Player is </h1>
        <div class = "txt">
        <p>Player X is : {user["X"]}</p>
        <p>Player O is : {user["O"]}</p>
        <p>Spectators</p>
          {user['spec'].map((player, i) => <p>{player}</p>)}
        </div>
        <div class="board">
        {board.map((item,index)=><BoardMake onClickButton = {()=>onClickButton(index)} item={item}/>)}
        </div>
        </div>
        );
    
    
    
}
