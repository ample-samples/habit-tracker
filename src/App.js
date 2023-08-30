import './App.css';
import { Routes, Route, Redirect } from'react-router-dom';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import HabitEntry from './pages/HabitEntry';
import Footer from './components/Footer';

import { useState, useEffect } from'react'

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState({name: undefined, email: undefined})

  const checkToken = () => {
    const tokenIsValid = null
    if (tokenIsValid) {
      setIsLoggedIn(true)
    }
  }

  if(isLoggedIn){
    return (
      <>
        <div className="App">
          <Navbar />
          <div className="main">
            <Routes>
              <Route path='/' element={<Dashboard user={user} />} />
              <Route path='/history' element={<History user={user} />} />
              <Route path='/habit/:date' element={<HabitEntry user={user} date={new Date().toISOString().slice(0, 10)} />}/>
            </Routes>
          </div>
          <Footer />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="App">
          <div className="login">
            <Login setIsLoggedIn={setIsLoggedIn} />            
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default App;
