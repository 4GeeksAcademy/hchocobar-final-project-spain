import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hadleOnClick = async () => {
    const url = process.env.BACKEND_URL + "/api/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username: email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      // Tratamiento del error
      console.log(response.status, response.statusText)
      return
    }
    const data = await response.json();
    actions.Login(data);
    // localStorage.setItem("token", data.access_token);
  }

  // store.isLoggedIn == true -> está logeado por lo tanto puede ver el dashboard
  // store.isLoggedIn != true -> no está logeado por lo tanto no puede ver el dashboard y lo envío a <Login/>


  return (
    store.isLoggedIn ? <Navigate to='/dashboard' /> :
      <div className="col-md-6 py-5 px-md-5">
        {/* 1. formulario con dos input
                            email
                            password
                            2. Controlar estos input con onChange
            */}
        <h1 className="text-center">Login</h1>
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control"
            value={email} onChange={(event) => setEmail(event.target.value)} />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control"
            value={password} onChange={(event) => setPassword(event.target.value)} />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>
        <div>
          <button onClick={hadleOnClick} type="button" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </div>
      </div>
  )
}