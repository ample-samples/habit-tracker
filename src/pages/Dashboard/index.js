import { useState, useEffect } from'react'
import '../../App.css'
import './style.css'

export default function Dashboard() {

  const [ habits, setHabits ] = useState([])

  async function getHabits() {
    const domain = process.env.REACT_APP_DB_DOMAIN
    const newHabits = await fetch(`${domain}/habits`)
    .then(async response =>  {
      const res = await response.json()
      return res
    })
    newHabits.sort((a, b) => a.date < b.date ? 1 : -1 )
    console.log({newHabits})
    setHabits(newHabits)
  }

  useEffect(() => {
    getHabits()
  }, [])


  const getSleepAverage = () => {
    let sum = 0
    let count = 0
    for (let i = 0; i < 7; i++) {
      if(habits[i]&&habits[i].sleep) {
        sum += Number(habits[i].sleep)
        count++
      }
    }
    return sum/count
  }

  const getStepsAverage = () => {
    let sum = 0
    let count = 0
    for (let i = 0; i < 7; i++) {
      if(habits[i]&&habits[i].steps) {
        sum += Number(habits[i].steps)
        count++
      }
    }
    return sum/count
  }

  const getCalorieAverage = () => {
    let sum = 0
    let count = 0
    for (let i = 0; i < 7; i++) {
      if(habits[i]&&habits[i].calories) {
        sum += Number(habits[i].calories)
        count++
      }
    }
    return sum/count
  }

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h2>Welcome back!</h2>
        <h3>Average daily calories</h3>
        <p><span className="entry-value">{getCalorieAverage()}</span> kcal</p>
        <h3>Average steps this week</h3>
        <p><span className="entry-value">{getStepsAverage()}</span> steps</p>
        <h3>Average sleep this week</h3>
        <p><span className="entry-value">{getSleepAverage()}</span> hours</p>
      </div>
    </>
  )
}
