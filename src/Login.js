import React from 'react';
import {ListItem} from './ListItem';
import {useState, useRef} from 'react';

export function Login()
{
    const [myList,changeList]=useState([]);
    return (
        <div>
        <h1>Welcome to tictactoe</h1>
           <input type="text"/>
           <button>Enter Player1</button>
           
        </div>
        
        
        
        );

}