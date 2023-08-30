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

  if (showLoginPage) {
    return(
      <>
        <div className="center">
          <h1>Login</h1>
          <form action="">
            <label htmlFor="email">
              Email:
              <br />
              <input type="email" name="email" />
            </label>
            <br />
            <label htmlFor="password">
              Password:
              <br />
              <input type="password" name="password" />
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
            <label htmlFor="">
              Email:
              <br />
              <input type="email" name="email" />
            </label>
            <br />
            <label htmlFor="">
              Password:
              <br />
              <input type="password" name="password" />
            </label>
            <br />
            <button>Register</button>
          </form>
          <p>Have an account?</p>
          <button onClick={setToLogin}>Login</button>
        </div>
      </>
    )
  }
}
