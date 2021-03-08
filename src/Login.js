import React from 'react';
import {useRef} from 'react';
import './Board.css';

export function Login({login})
{
    let user = useRef(null);
    return (
        <div>
       <center>
            <input ref = {user} type="text"/>
            <button onClick= {()=>login(user.current.value)}>Enter</button>
       </center>
        </div>
        );

}