import React from 'react'
import { Link } from 'react-router-dom'
import "./SignUp.css"

function SignUp() {
  return (
    <div>
       <form className="sign-up-form">
          <h2 className="title">Sign up</h2>
          <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
          </div>
          <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
          </div>
          <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
          </div>
          <input type="submit" value="Sign up" className="butn" />
          <p>Already have an account?
            <Link to="/logout">
              <button>
                Sign in
              </button>
            </Link> 
          </p>
      </form>
    </div>
  )
}

export default SignUp