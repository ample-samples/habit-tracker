import { useState, useEffect } from'react'
import { useNavigate } from'react-router-dom'
import './style.css'
const domain = process.env.REACT_APP_DB_DOMAIN

export default function Login ({setIsLoggedIn, setUser}) {


  const [ showLoginPage, setShowLoginPage ] = useState(true)
  const [ loginMessage, setLoginMessage ] = useState("")

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
    return false
  }
}

  const registerUser = async (e) => {
    e.preventDefault()
    const email = e.target.form[0].value
    const password = e.target.form[1].value
    const repeatPassword = e.target.form[2].value

    if (!validateEmail(email)) {
      alert("Please enter a valid email address")
      return false 
    }
    if (password !== repeatPassword) {
      alert("Passwords don't match")
      return false
    }
    //send post to server to create a new user,
    // if the user exists, display an alert
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({email, password})
    }
    const response = await fetch(`${domain}/users/`, options).then((response) => {
      return response.json()
    })
    // const habits = await fetch(`${domain}/habits`).then(response => {
    //   return response.json()
    // })
    console.log(response)
  }

  const loginUser = async (e) => {
    e.preventDefault()
    const email = e.target.form[0].value
    const password = e.target.form[1].value
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({email, password})
    }
    console.log({options})
    const user = await fetch(`${domain}/login`, options).then((response) => {
      return response.json()
    })
    console.log(user)
    setLoginMessage(user.message)
    const loginSuccess = user.profile
    if(!loginSuccess) {
      alert("incorrect email and password combination")
      return false
    }
    setUser(user.profile)
    setIsLoggedIn(true)
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
            <button onClick={loginUser}>Login</button>
            <div>{loginMessage}</div>
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
