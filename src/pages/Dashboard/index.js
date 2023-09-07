import { useState, useEffect } from'react'
import '../../App.css'
import './style.css'
import { LineChart } from '../../components/utils/chart'
import { getCalorieAverage, getSleepAverage, getStepsAverage } from '../../components/utils/stats'
import { getHabitsByUser } from '../../components/utils/fetch'

export default function Dashboard(params) {
  const [ habits, setHabits ] = useState([])
  const [ chart1Labels, setChart1Labels ] = useState([])

  async function initHabits() {
    const { userId, email } = params.user
    const newHabits = await getHabitsByUser(userId, email)
    setHabits(newHabits)
  }

  useEffect(() => {
    initHabits()
  }, [])

  // This use effect will generate chart labels from the habits variable
  useEffect(() => {
    const labels = []
    for (let i=0; i<habits.length; i++) {
      labels.unshift(habits[i].date)
    }
    console.log(labels.slice(-10))
    setChart1Labels(labels.slice(-10))
  }, [habits])

  const chart1Data = {
    labels: chart1Labels,
    datasets: [
      {
        label: 'Step count',
        data: habits.map((entry) => entry.steps ).reverse().slice(-10),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h2>Welcome back!</h2>
        <h3>Average daily calories</h3>
        <p><span className="entry-value">{getCalorieAverage(habits)}</span> kcal</p>
        <h3>Average steps this week</h3>
        <p><span className="entry-value">{getStepsAverage(habits)}</span> steps</p>
        <h3>Average sleep this week</h3>
        <p><span className="entry-value">{getSleepAverage(habits)}</span> hours</p>
        <LineChart titleText={`Steps`} data={chart1Data} />
      </div>
    </>
  )
}
