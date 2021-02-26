import React from 'react';
import {ListItem} from './ListItem';
import {useState, useRef} from 'react';
import './Board.css';

export function Login({login})
{
    let user = useRef(null);
    return (
        <div>
        <center>
            <input ref = {user} type="text"/>
            <button onClick= {()=>login(user.current.value)}>Click</button>
        </center>
        </div>
        );

}