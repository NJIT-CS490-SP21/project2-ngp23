import React from 'react';
import './Board.css';
import io from 'socket.io-client';
import { useState, useRef, useEffect,dispatch } from 'react';
const socket = io(); // Connects to socket connection
export function LeaderBoard()
{
    const [lead,setLead]=useState({});
    socket.on('leaderboard', (data) => {
      console.log('leaderboard event received!');
      console.log(data);
      setLead(data);
        });
    
    return (       
    <div class="txtLeft">
        <table>
            <thead>
                <tr>
                   <th colspan="2">ScoreBoard</th>
                   </tr>
                   </thead>
                   <tbody>
                          {Object.keys(lead).map(keys => <tr><td> {keys}</td> <td>{lead[keys]}</td> </tr>)}
                    </tbody>
        </table>
        </div>
        )
}