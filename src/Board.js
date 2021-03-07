//imports all needed libraries
import React from 'react';
import './Board.css';
import { useState, useRef, useEffect} from 'react';
import { BoardMake } from './BoardMake.js'
import io from 'socket.io-client';
import { Winner } from './Winner.js'
import {LeaderBoard} from './LeaderBoard.js'


const socket = io(); // Connects to socket connection
export function Board({tempUser}) {
    //setup the state
    const [board, setBoard] = useState(Array(9).fill(null));
    let [user, setUser] = useState({ "X": "", "O": "", "spec": [] })
    //const to checl the state.
    const [state2, setState2] = useState(1);
    const [check,setcheck]=useState(false);
    const [lead,setLead] = useState();

    //onclick button function
    function onClickButton(index) {
        //variable to store the targer innerHtml
        
        let userClick
        let win;
        let lose;
        userClick=[...board];
        //If statement checks if the box is empty or not if empty then only procide.
        if(Winner(board)){alert("Already one winner, reset the game to play.");return;}
        if (!userClick[index] ) 
        {
            if(tempUser === user["X"])
            {
                //if state is 1 then its gives X as value
                if (state2 === 1) 
                {
                   userClick[index] = "X";
                    //changes the state to 0 for the O in next box
                    setState2(0);
                    setBoard(userClick);
                    socket.emit('click', { userClick: userClick,setState2:state2});
                }
                else{alert("wait for your turn")
                  }
                    //socket.emit("resetStats",{setWin:win,setLose:lose});
            }
            else if(tempUser===user["O"])
            {
                //O value is printed out
                if(state2===0){
                userClick [index] = "O";
                //changes the state to 1 for the x in next box
                setState2(1);
                setBoard(userClick);
                socket.emit('click', { userClick: userClick,setState2:state2});
                }
                else{
                    alert("wait for your turn");
                }
            } 
                    
            else{alert("Game in progress!")}
                
          
        }
        //else{alert("Invalid box")}
            const winner = Winner(userClick);
            console.log(winner)
            if(winner&& winner!='draw'){     
            if("X"== winner)
            {
                 win=user["X"];
                 lose=user["O"]

            }else
            {
                 win=user["O"];
                 lose=user["X"]

            }
            socket.emit("resetStats",{setWin:win,setLose:lose});
            }
        
        
    }

    useEffect(() => {
    socket.on('click', (data) => 
    {
      console.log('Click event received!');
      console.log(data);
      
      setBoard([...data.userClick]);
      if(data.setState2===0)
      {
        setState2(1);
      }
      else
      {
          setState2(0);
      }
      
    });
    socket.on('login', (login) => 
    {
      console.log('A Player has logged in!');
      console.log(login);
      Object.keys(login).map((item) => 
            {
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
      if(data.setState2===0)
      {
        setState2(1);
      }
      else
      {
          setState2(0);
      }
        });
        
    socket.on('resetStats', (data) => {
      console.log('resetStats event received!');
      console.log(data);
      setLead(data);
        });

}, []);
  
    const winner = Winner(board);
    let status;
    
    if(winner && winner !=='draw')
    {
        status = `winner is ${winner}`;
        
    }else if(winner && winner==='draw')
    {
        status = ` No winner game draw`;
    }
    else
    {
        status= `Next Player: ${(state2 === 1)?"X":"O"}`;
    }

    const reset=()=>
    {
        let userClick;
        userClick = [...board];
        userClick.fill(null);
        setBoard(userClick);
        if(state2===0)
        {
            setState2(1);
        }
        else
        {
            setState2(0);
            
        }
        socket.emit('reset', { userClick: userClick,setState2:state2});
    }
    const operation=()=>{setcheck(!check)}

    return (
        //renders to the BoardMake.js 
        <div>
            <p class ="txtNext" >{status}<br/></p>
        <div>
            <center>{tempUser===user["X"] && <button class ="buttonR" onClick={reset} type="button">reset</button>}</center>
            <center>{tempUser===user["O"] && <button class ="buttonR" onClick={reset} type="button">reset</button>}</center>
        </div>
        <div class = "txt">
            <h2 class="txtplayer">Player username </h2>
            <p class="txtplayer">Player X is : {user["X"]}</p>
            <p class="txtplayer">Player O is : {user["O"]}</p>
            <p class= "txtspec">Spectators</p>
            {user['spec'].map((player, i) => <p class="txtspec">{player}</p>)}
        </div>
        
        <div>
         <button class= "hideButton"onClick={operation}>Hide</button>
        { check?
         <div><LeaderBoard lead={lead} tempUser={tempUser}/></div>
        :null
        }
        </div>
        <div class="board">
            {board.map((item,index)=><BoardMake onClickButton = {()=>onClickButton(index)} item={item}/>)}
        </div>
        
        </div>
        );
    
}
