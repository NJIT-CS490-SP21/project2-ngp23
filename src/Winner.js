import React from "react";
import './Board.css';
export function Winner(board)
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
         
         let check;
        
         for(let i =0;i<winningLines.length;i++)
         {
             const[a,b,c]=winningLines[i];
             if(board[a] &&board[a] === board[b]&&board[a]===board[c])
             {
             return board[a];
             } 
             else if(!board.includes(null)){return 'draw';}
         }
         return null;
         }

