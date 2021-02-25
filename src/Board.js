//imports all needed libraries
import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { BoardMake } from './BoardMake.js'
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection
export function Board() {
    //setup the state
    const [board, setBoard] = useState(Array(9).fill(null));
    //const to checl the state.
    const [state2, setState2] = useState(1);
    

    //onclick button function
    function onClickButton(index) {
        //variable to store the targer innerHtml
        let userClick
        userClick=[...board];
        //If statement checks if the box is empty or not if empty then only procide.
        if (!userClick[index]) {
            //if state is 1 then its gives X as value
            if (state2 === 1) {
               userClick[index] = "X";
                //changes the state to 0 for the O in next box
                setState2(0);
            }
            else {
                //O value is printed out
                userClick [index] = "O";
                //changes the state to 1 for the x in next box
                setState2(1);
            }
        }
        setBoard(userClick);
        socket.emit('click', { userClick: userClick,setState2:state2});
       
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
  }, []);

    return (
        //renders to the BoardMake.js 
        <div class="board">
        {board.map((item,index)=><BoardMake onClickButton = {()=>onClickButton(index)} item={item}/>)}
    </div>
    );
}
