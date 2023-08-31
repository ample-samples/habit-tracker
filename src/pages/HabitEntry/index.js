import { useParams } from'react-router-dom'
import { useEffect, useState } from'react'
import './style.css'

const domain = process.env.REACT_APP_DB_DOMAIN

export default function HabitEntry (user) {
  const params = useParams()
  const { email, userId } = user.user
  const getTodaysHabits = async () => {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({email, id: userId, date: params.date})
    }
    const todaysHabits = await fetch(`${domain}/habits/user`, options)
      .then((response) => response.json())
    console.log("todays habits request", todaysHabits)
    return todaysHabits
  }
  const [ formData, setFormData ] = useState({})
  const [ todaysHabits, setTodaysHabits ] = useState({})
  useEffect(() => {
  const todaysHabits = getTodaysHabits()
    setTodaysHabits(todaysHabits)
    setFormData(todaysHabits)
    return () => {
    }
  }, [])

  console.log({user})

  console.log(email, userId)

  // console.log(options.body)

  const handleChange = (e) => {
    const { name, value } = e.target
    const newHabitsData = { ...formData.habits, [name]: value }
    setFormData({...formData, habits: newHabitsData })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log({ todaysHabits })
    if (todaysHabits.length > 0) {
      const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify({ ...formData.habits, date: params.date, userId })
      }
      await fetch(`${domain}/habits/`, options)

    } else {
      const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ ...formData.habits, date: params.date, userId})
      }
      await fetch(`${domain}/habits/`, options)

    }
  }

  return (
    <>
      <div className="habit-page">
        <h1>Habits for {params.date}</h1>
        
        <form onChange={handleChange} onSubmit={handleSubmit} className="form">
          <label htmlFor="sleep">Sleep (hrs)</label><input type="text" name="sleep" id="sleep" placeholder={formData ? (formData.sleep) : '0'} />
          <label htmlFor="calories">Calories (kcal)</label><input type="text" name="calories" id="calories" placeholder={formData ? (formData.calories) : '0'} />
          <label htmlFor="meditation">Meditation (mins)</label><input type="text" name="meditation" id="meditation" placeholder={formData ? (formData.meditation) : '0'} />
          <label htmlFor="steps">Steps (count)</label><input type="text" name="steps" id="steps" placeholder={formData ? (formData.steps) : '0'} />
          <button type="submit">Accept</button>
        </form>
      </div>
    </>
  )
}
