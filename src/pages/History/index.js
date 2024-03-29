import { useState, useEffect } from'react'
import { useNavigate } from'react-router-dom'
import './style.css'


export default function History(params) {
  const [ habits, setHabits ] = useState([])

  async function getHabits() {
    const {userId, email} = params.user
    const domain = process.env.REACT_APP_DB_DOMAIN
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({email, id: userId})
    }
    const newHabits = await fetch(`${domain}/habits/user`, options)
      .then((response) => response.json())
    console.log("habits request", newHabits)
    newHabits.sort((a, b) => a.date < b.date ? 1 : -1 )
    console.log({newHabits})
    setHabits(newHabits)
  }

  useEffect(() => {
    getHabits()
  }, [])

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
              <span className="date">{habitEntry.date}</span>
              <span>Sleep 🛏 (hrs): <span className="entry-value">{habitEntry.sleep}</span></span>
              <span>Calories 🍴 (kcal): <span className="entry-value">{habitEntry.calories}</span></span>
              <span>Meditation ☯ (mins): <span className="entry-value">{habitEntry.meditation}</span></span>
              <span>Steps 👟 (count): <span className="entry-value">{habitEntry.steps}</span></span>
              <button type='submit' name={habitEntry.date} onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
