import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';


const Home = () => {

  // verify whether user logged in, redirect if not
  if (Auth.loggedIn()) {
    return <Redirect to="/warehouse" />
  }

  return (
    <main className='d-flex flex-column align-items-center justify-content-center background'>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='m-5 shadow bg-body rounded op'>
          <h1 className="mx-auto text-center m-5">Regular Warehouse.</h1>
          <p className="text-center m-5 p5">You can only enter this totally normal warehouse if you know the password. Your password.</p>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/login" className="d-grid gap-2 op no-underline">
              <button type="button" className="shadow bg-body rounded btn btn-outline-dark no-underline home-button">Login</button>
            </Link>
            <Link to="/signup" className="d-grid gap-2 op no-underline">
              <button type="button" className="shadow bg-body rounded btn btn-outline-dark no-underline home-button">Signup</button>
            </Link>
        </div>
      </div>
    </main>
  )
}

export default Home;