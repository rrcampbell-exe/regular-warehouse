import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <main>
      <h1>📦 Regular Warehouse.</h1>
      <p>You can only enter this totally normal warehouse if you know the password. Your password.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </main>
  )
}

export default Home;