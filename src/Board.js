//imports all needed libraries
import React from 'react';
import './Board.css';
import { useState, useRef, useEffect,dispatch } from 'react';
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
  
    let status;
    const winner = calculateWinner(board);
    
    if(winner)
    {
        status = `winner is ${winner}`;
        
    }else
    {
        status= `Next Player: ${(state2 === 1)?"X":"O"}`;
    }
    const reset=()=>
    {
        setBoard(board.map((item)=>item=""))
    }
    return (
        //renders to the BoardMake.js 
        <div>
        <div>{status}</div>
        <div><button onClick={reset} type="button">reset</button></div>
        <div class="board">
        {board.map((item,index)=><BoardMake onClickButton = {()=>onClickButton(index)} item={item}/>)}
        </div>
        </div>
    );
    
    
    
    function calculateWinner(board)
    {
        const winningLines =  
         [ [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]];
         console.log(board);
         for(let i =0;i<winningLines.length;i++)
         {
             const[a,b,c]=winningLines[i];
             if(board[a]&&board[a] === board[b]&&board[a]===board[c])
             {
                 return board[a];
             }
         }
         return null;
        
    }
}
