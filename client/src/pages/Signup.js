import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth'

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
    
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="container-fluid   w-100 my-4 full-height d-flex align-items-center">
      <div className="col-12 col-md-6 mx-auto align-self-center container">
        <div className="card  w-100 align-self-center no-margin">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body shadow">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-control my-2"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-control my-2"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-control my-2"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn btn-outline-secondary d-block w-100 my-2 shadow-sm" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Sign up failed. Please ensure your password is a minimum of eight characters long.</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;