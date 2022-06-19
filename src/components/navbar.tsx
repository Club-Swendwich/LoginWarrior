import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbarArea">
      <ul>
        <li className="navbarItem">
          <NavLink className={({ isActive }) => (isActive ? 'link-active' : 'link')} to="/">LoginWarrior</NavLink>
        </li>
        <li className="navbarItem">
          <NavLink className={({ isActive }) => (isActive ? 'link-active' : 'link')} to="/scatterplot">Scatterplot</NavLink>
        </li>
        <li className="navbarItem">
          <NavLink className={({ isActive }) => (isActive ? 'link-active' : 'link')} to="/data">Gestione Dati</NavLink>
        </li>
      </ul>
      <a href="https://github.com/Club-Swendwich"><img src="logo_big.jpg" alt="logo" /></a>
    </div>
  );
}
export default Navbar;
