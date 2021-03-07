import React from 'react';
import './Board.css';
//import io from 'socket.io-client';
//const socket = io(); // Connects to socket connection
export function LeaderBoard({lead,tempUser})
{
    return (       
    <div class="txtLeft">
        <table>
            <thead>
                <tr>
                   <th colspan="2" class= "txtL">ScoreBoard</th>
                </tr>
            </thead>
                   <tbody>
                    {lead.map((item)=>Object.keys(item).map(keys =>(tempUser===keys)?
                        <tr class = "colortext"><td > {keys}</td> <td>{item[keys]}</td> </tr>:
                        <tr><td> {keys}</td> <td>{item[keys]}</td> </tr>
                        ))}
                  </tbody>
        </table>
    </div>
        )
}
