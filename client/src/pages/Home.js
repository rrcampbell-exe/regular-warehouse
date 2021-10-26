import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';


const Home = () => {

  // verify whether user logged in, redirect if not
  if (Auth.loggedIn()) {
    return <Redirect to="/warehouse" />
  }

  return (
    <main className='container-fluid mx-auto background'>
      <div class='d-flex flex-column align-items-center'>
        <div class='m-5 shadow bg-body rounded op'>
          <h1 class="mx-auto text-center m-5">Regular Warehouse.</h1>
          <p class="text-center m-5 p5">You can only enter this totally normal warehouse if you know the password. Your password.</p>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
            <Link to="/login" class="d-grid gap-2 op">
              <button type="button" class="shadow bg-body rounded btn btn-outline-primary">Login</button>
            </Link>
            <Link to="/signup" class="d-grid gap-2 op">
              <button type="button" class="shadow bg-body rounded btn btn-outline-success">Signup</button>
            </Link>
        </div>
      </div>
    </main>
  )
}

export default Home;