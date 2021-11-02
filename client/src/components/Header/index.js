import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='bg-light border shadow-sm p-1 text-shadow align-items-center d-flex align-items-center'>
      <Link to='/warehouse' className='nav nav-link text-dark' >
        <h1 className="align-middle site-title">📦 Regular Warehouse.</h1>
        </Link>
      <Link to="/" onClick={logout} className='nav nav-link ml-auto text-align-center text-dark align-middle'><span className="material-icons md-12 align-middle text-to-shrink">logout</span><span className="text-to-shrink align-middle"> Log Out</span></Link>
    </header>
  );
};

export default Header;
