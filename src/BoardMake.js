import React from 'react';
import './Board.css';
import PropTypes from 'prop-types';

function BoardMake({ onClickButton, item }) {
  return (
    <div
      className="box"
      onClick={(event) => onClickButton(event)}
      onKeyDown={(event) => onClickButton(event)}
      role="button"
      tabIndex="-1"
    >
      {item}
    </div>
  );
}
BoardMake.propTypes = {
  onClickButton: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

export default BoardMake;
