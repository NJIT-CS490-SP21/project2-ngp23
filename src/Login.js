import React from 'react';
import {ListItem} from './ListItem';
import {useState, useRef} from 'react';

export function Login({login})
{
    let user = useRef(null);
    return (
        <div>
            <input ref = {user} type="text"/>
            <button onClick= {()=>login(user.current.value)}>Click</button>
        </div>
        );

}