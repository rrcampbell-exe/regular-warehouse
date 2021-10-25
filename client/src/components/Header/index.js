import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
    
      return (
        <header>
            <h1>📦 Regular Warehouse.</h1>
            <Link to="/">Log Out</Link>
        </header>
      );
};

export default Header;