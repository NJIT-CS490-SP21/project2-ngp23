import React from 'react';
import './Board.css';
import io from 'socket.io-client';
const socket = io(); // Connects to socket connection
export function LeaderBoard({lead})
{
    console.log(lead)
    // lead.map((item)=>{
    //     Object.keys(item).map(keys => {
    //         console.log(keys), console.log({item[keys]}
    //         ) } ) } )
    lead.map((item) =>{
        Object.keys(item).map(score =>{
            console.log(score)
            console.log(item[score])
        })
    })        
    return (       
    <div class="txtLeft">
        <table>
            <thead>
                <tr>
                   <th colspan="2">ScoreBoard</th>
                   </tr>
                   </thead>
                   <tbody>
                   {lead.map((item)=>Object.keys(item).map(keys => <tr><td> {keys}</td> <td>{item[keys]}</td> </tr>))}
                    </tbody>
        </table>
        </div>
        )
}
