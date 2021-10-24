import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <main className='container-fluid'>
      <h1 class="mx-auto">Regular Warehouse.</h1>
      <p class="mx-auto">You can only enter this totally normal warehouse if you know the password. Your password.</p>
      
      <div class="d-grid gap-2 col-6 mx-auto">
          <Link to="/login">
            <button type="button" class="btn btn-outline-primary">Login</button>
          </Link>
          <Link to="/signup" type="button" class="btn btn-outline-success">
            <button>Signup</button>
          </Link>
      </div>
    </main>
  )
}

export default Home;