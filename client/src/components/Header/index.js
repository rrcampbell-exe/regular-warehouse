import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='bg-light border shadow-sm mb-3 p-1 text-shadow'>
      <h1>📦 Regular Warehouse.</h1>
      <Link to="/" onClick={logout} className='nav nav-link'><span className="material-icons md-12 align-bottom">logout</span>Log Out</Link>
    </header>
  );
};

export default Header;
