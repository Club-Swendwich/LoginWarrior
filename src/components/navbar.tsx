import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbarArea">
      <li className="navbarItem">
        <Link to="/">Scatterplot</Link>
      </li>
      <li className="navbarItem">
        <Link to="/data">Settings</Link>
      </li>
    </div>
  );
}
export default Navbar;
