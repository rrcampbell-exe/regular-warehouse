import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='bg-light'>
      <h1>📦 Regular Warehouse.</h1>
      <Link to="/" onClick={logout}>Log Out</Link>
    </header>
  );
};

export default Header;
