import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Board.css';

function Login({ login }) {
  const user = useRef(null);
  return (
    <div>
      <center>
        <input ref={user} type="text" />
        <button onClick={() => login(user.current.value)} type="submit">
          Enter
        </button>
      </center>
    </div>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
