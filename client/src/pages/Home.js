import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';


const Home = () => {

  // verify whether user logged in, redirect if not
  if (Auth.loggedIn()) {
    return <Redirect to="/warehouse" />
  }

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