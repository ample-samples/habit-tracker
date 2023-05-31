import HabitEntry from '../../pages/HabitEntry'
import { useNavigate } from'react-router-dom'
import './style.css'

const domain = process.env.REACT_APP_DB_DOMAIN
const habits = await fetch(`${domain}/habits`).then(response => {
  return response.json()
})

export default function History () {
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.preventDefault()
    navigate(`/habit/${e.target.name}`)
  }

  habits.sort((a, b) => a.date < b.date ? 1 : -1 )

  return (
    <>
      <div className="history">
        <h1>History</h1>
        <div className="habit-entries">
          {habits.map((habitEntry) => 
            <>
              <span>{habitEntry.date}</span>
              <span>Sleep 🛏 (hrs): <span className="entry-value">{habitEntry.sleep}</span></span>
              <span>Calories 🍴 (kcal): <span className="entry-value">{habitEntry.calories}</span></span>
              <span>Meditation ☯ (mins): <span className="entry-value">{habitEntry.meditation}</span></span>
              <button type='submit' name={habitEntry.date} onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
