import {useNavigate} from 'react-router-dom';

export default function Navbar() {

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
      <button onClick={navToDashboard}>Dashboard</button>
      <button onClick={navToTodaysHabit}>Today's Habits</button>
      <button onClick={navToHabitHistory}>Habit History</button>
    </div>
  )
}
