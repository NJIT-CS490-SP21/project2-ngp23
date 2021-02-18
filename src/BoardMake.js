import React from 'react';
import './Board.css';

export function BoardMake({ onClickButton }) {
    return <div class = "box" onClick={(event) => onClickButton(event)}></div>
}
