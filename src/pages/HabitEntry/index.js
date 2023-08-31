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
      .then((response) => {return response.json()})
    console.log("todays habits request", todaysHabits)
    setTodaysHabits(todaysHabits)
    return todaysHabits
  }

  const [ todaysHabits, setTodaysHabits ] = useState([])
  const [ formData, setFormData ] = useState({})

  useEffect(() => {
    console.log({todaysHabits})
   const foundHabit = todaysHabits.find((habit) => {
      return habit.date === params.date
    })
    console.log({foundHabit})
    foundHabit && setFormData(foundHabit)
  }, [todaysHabits])

  useEffect(() => {
    const todaysHabits = getTodaysHabits()
  }, [])

  useEffect(() => {
    console.log({formData})
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newHabitsData = { ...formData.habits, [name]: value }
    setFormData({...formData, habits: newHabitsData })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log({ todaysHabits })
    if (todaysHabits.find((habit)=> {
      return habit.date === params.date
    })) {
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
