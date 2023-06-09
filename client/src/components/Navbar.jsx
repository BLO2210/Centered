import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [centeredExpanded, setCenteredExpanded] = useState(false);

  const handleMenuToggle = () => {
    setMenuExpanded(!menuExpanded);
    setCenteredExpanded(!centeredExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userId')
}

  return (
    <nav className="navbar">
      <div className={`left-menu ${menuExpanded ? 'expanded' : ''}`}>
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={handleMenuToggle} />
        {menuExpanded && (
          <ul className="expanded-menu">
            <li>
              <Link to="/form">Today</Link>
            </li>
            <li>
              <Link to="/YourData">Your Data</Link>
            </li>
          </ul>
        )}
      </div>
      <div className={`centered ${centeredExpanded ? 'expanded' : ''}`}>
        <span className="centered-logo"><Link to = "/">Centered</Link></span>
      </div>
      <div className="right-menu">
        <button onClick={handleLogout}>
        <Link to="/login">
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-button" />
        </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
