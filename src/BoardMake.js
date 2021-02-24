import React from 'react';
import './Board.css';

export function BoardMake({ onClickButton,item }) {
    return <div class = "box" onClick={(event) => onClickButton(event)} >{item}</div>
}
