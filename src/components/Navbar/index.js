import {useNavigate} from 'react-router-dom';
import './style.css'
import journal from '../../assets/journal.png'

export default function Navbar({ isLoggedIn }) {

  const navigate = useNavigate();

  const navToTodaysHabit = () => {
    navigate(`habit/${new Date().toISOString().slice(0, 10)}`)
  }

  const navToDashboard = () => {
    navigate(`/`)
  }

  const navToHabitHistory = () => {
    navigate(`/history`)
  }

  return (
    <div className="navbar">
      <img src={journal} alt="logo" height="50"/>
      <button onClick={navToDashboard}>Dashboard</button>
      <button onClick={navToTodaysHabit}>Today's Habits</button>
      <button onClick={navToHabitHistory}>Habit History</button>
    </div>
  )
}
