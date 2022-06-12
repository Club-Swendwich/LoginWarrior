import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/scatter">Scatterplot</Link>
      </li>
      <li>
        <Link to="/sankey">Sankey Diagram</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
    </div>
  );
}
export default Navbar;
