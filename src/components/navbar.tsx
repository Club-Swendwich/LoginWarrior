import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbarArea">
      <ul>
        <li className="navbarItem">
          <Link to="/">LoginWarrior</Link>
        </li>
        <li className="navbarItem">
          <Link to="/scatterplot">Scatterplot</Link>
        </li>
        <li className="navbarItem">
          <Link to="/data">Gestione Dati</Link>
        </li>
      </ul>
      <a href="https://github.com/Club-Swendwich"><img src="logo.svg" alt="logo" /></a>
    </div>
  );
}
export default Navbar;
