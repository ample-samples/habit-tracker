import { useState, useEffect } from'react'
import '../../App.css'
import './style.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

export default function Dashboard(params) {
  const [ habits, setHabits ] = useState([])
  const [ chart1Labels, setChart1Labels ] = useState([])

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
        label: 'Steps',
        data: habits.map((entry) => { 
          return entry.steps 
        }).reverse().slice(-10),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  console.log(chart1Data.datasets[0].data)

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
      <Line options={options} data={chart1Data} />
      {console.log( <Line options={options} data={chart1Data} />)}
    </>
  )
}
