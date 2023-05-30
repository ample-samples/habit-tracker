import { useParams } from'react-router-dom'
import { useEffect, useState } from'react'
import './style.css'

const domain = process.env.REACT_APP_DB_DOMAIN
const habits = await fetch(`${domain}/habits`).then(response => {
  return response.json()
})

export default function HabitEntry () {

  const todaysHabits = habits.find((item) => item.date === new Date().toISOString().slice(0, 10))
  console.log({ todaysHabits })
  const [ formData, setFormData ] = useState(todaysHabits)


  const params = useParams()

  useEffect(() => {

  })

  const handleChange = (e) => {
    console.log("Starting change")
    console.log({formData})
    console.log(e.target.name)
    console.log(e.target.value)
    const name = e.target.name
    const value = e.target.value
    const newHabitsData = { ...formData.habits, [name]: value }
    const objToSend = {...formData, habits: newHabitsData }
    setFormData(objToSend)
    console.log("Finished change")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(formData.habits)
    }

    const res = await fetch(`${domain}/habits/${todaysHabits.id}`, options)
  }

  return (
    <>
      <h1>Habits for {params.date}</h1>

      <form onChange={handleChange} onSubmit={handleSubmit} className="form">
        {console.log(formData)}
        <label for="sleep">Sleep (hrs)</label><input type="text" name="sleep" id="sleep" placeholder={formData.sleep} />
        <label for="calories">Calories (kcal)</label><input type="text" name="calories" id="calories" placeholder={formData.calories} />
        <label for="meditation">Meditation (mins)</label><input type="text" name="meditation" id="meditation" placeholder={formData.meditation} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
