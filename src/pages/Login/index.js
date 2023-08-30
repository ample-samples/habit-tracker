import { useState, useEffect } from'react'
import { useNavigate } from'react-router-dom'
import './style.css'

export default function Login () {
  return(
    <>
      <form action="">
        <label htmlFor="">
          Email:
          <input type="email" name="email" />
        </label>
        <label htmlFor="">
          Password:
          <input type="password" name="password" />
        </label>
        <button>Login</button>
      </form>
    </>
  )
}
