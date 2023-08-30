import { useState, useEffect } from'react'
import { useNavigate } from'react-router-dom'
import './style.css'

export default function Login () {


  const [ showLoginPage, setShowLoginPage ] = useState(true)

  const setToRegister = (e) => {
    e.preventDefault()
    setShowLoginPage(false)
  }

  const setToLogin= (e) => {
    e.preventDefault()
    setShowLoginPage(true)
  }

const validateEmail = (email) => {

  const validEmail = email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    if (validEmail) {
      return true
    } else {
      alert("Please enter a valid email address")
      return false
    }
}

  const registerUser = (e) => {
    e.preventDefault()
    const email = e.target.form[0].value
    const password = e.target.form[1].value
    const repeatPassword = e.target.form[2].value

    if (!validateEmail(email)) return false 


  }

  const loginUser = (e) => {
    e.preventDefault()
  }

  if (showLoginPage) {
    return(
      <>
        <div className="center">
          <h1>Login</h1>
          <form action="">
            <label htmlFor="email">
              Email:
              <br />
              <input type="email" name="email" id="email" />
            </label>
            <br />
            <label htmlFor="password">
              Password:
              <br />
              <input type="password" name="password" id="password" />
            </label>
            <br />
            <button>Login</button>
          </form>
          <p>Need an account?</p>
          <button onClick={setToRegister}>Register</button>
        </div>
      </>
    )
  } else {
    return(
      <>
        <div className="center">
          <h1>Register</h1>
          <form action="">
            <label htmlFor="email">
              Email:
              <br />
              <input type="email" name="email" id="email" />
            </label>
            <br />
            <label htmlFor="password">
              Password:
              <br />
              <input type="password" name="password" id="password" />
            </label>
            <br />
            <label htmlFor="password-repeat">
              Confirm password:
              <br />
              <input type="password" name="confirm-password" id="password-repeat" />
            </label>
            <br />
            <button onClick={registerUser}>Register</button>
          </form>
          <p>Have an account?</p>
          <button onClick={setToLogin}>Login</button>
        </div>
      </>
    )
  }
}
