import { useState, useEffect } from'react'
import '../../App.css'

export default function Dashboard() {

  const [ habits, setHabits ] = useState([])

  async function getHabits() {
    const domain = process.env.REACT_APP_DB_DOMAIN
    const newHabits = await fetch(`${domain}/habits`).then(response => {
      const res = response.json()
      return res
    })
    newHabits.sort((a, b) => a.date < b.date ? 1 : -1 )
    setHabits(newHabits)
  }

  useEffect(() => {
    getHabits()
  }, [])


  const getSleepAverage = () => {
    let sum = 0
    let count = 0
    for (let i = 0; i < 7; i++) {
      if(habits[i]) {
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
      if(habits[i]) {
        sum += Number(habits[i].steps)
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
        <p>At least 1</p>
        <h3>Average this week</h3>
        <p>{getStepsAverage()} steps</p>
        <h3>Average sleep this week</h3>
        <p>{getSleepAverage()} hours</p>
      </div>
    </>
  )
}
