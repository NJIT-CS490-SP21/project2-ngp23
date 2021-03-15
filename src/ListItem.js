import React from 'react';
import PropTypes from 'prop-types';

function ListItem({ name }) {
  return (
    <li className="chat">
      {' '}
      {name}
    </li>
  );
}
ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};
export default ListItem;
