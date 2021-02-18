//imports all needed libraries
import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';
import { BoardMake } from './BoardMake.js'

export function Board() {
    //setup the state
    const [board, setBoard] = useState(Array(9).fill(null));
    //const to checl the state.
    const [state2, setState2] = useState(1);
    //onclick button function
    function onClickButton(e) {
        //variable to store the targer innerHtml
        let userClick
        //If statement checks if the box is empty or not if empty then only procide.
        if (!e.target.innerHTML) {
            //if state is 1 then its gives X as value
            if (state2 === 1) {
                userClick = e.target.innerHTML = "X";
                //changes the state to 0 for the O in next box
                setState2(0);
            }
            else {
                //O value is printed out
                userClick = e.target.innerHTML = "O";
                //changes the state to 1 for the x in next box
                setState2(1);

            }
        }
        setBoard(prevList => [...prevList, userClick])

    }

    return (
        //renders to the BoardMake.js 
        <div class="board">
        {board.map(item=><BoardMake onClickButton = {onClickButton}/>)}
    </div>
    )
}
