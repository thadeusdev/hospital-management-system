import React from 'react'
import { Link } from 'react-router-dom'
import "./LogIn.css"

function Login()
{
   return (
    <div>
      <form className="sign-in-form">
          <h2 className="title">Sign in</h2>
          <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
          </div>
          <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
          </div>
          <Link to="/dashboard">
          <input type="submit" value="Login" className="butn" />
          </Link>          
          <p>Don't have an account? 
            <Link to="/signup">
              <button> 
                Sign up
              </button>
            </Link>
          </p>
      </form>
    </div>
  )
}

export default Login