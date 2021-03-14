import React from 'react';
import './Board.css';
// import io from 'socket.io-client';
// const socket = io(); // Connects to socket connection
import PropTypes from 'prop-types';

function LeaderBoard({ lead, tempUser }) {
  return (
    <div className="txtLeft">
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="txtL">
              ScoreBoard
            </th>
          </tr>
        </thead>
        <tbody>
          {lead.map((item) =>
            Object.keys(item).map((keys) =>
              tempUser === keys ? (
                <tr className="colortext">
                  <td> {keys}</td> <td>{item[keys]}</td>{' '}
                </tr>
              ) : (
                <tr>
                  <td> {keys}</td> <td>{item[keys]}</td>{' '}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
LeaderBoard.propTypes = {
  lead: PropTypes.string.isRequired,
  tempUser: PropTypes.string.isRequired,
};
export default LeaderBoard;
