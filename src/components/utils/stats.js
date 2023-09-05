export const getSleepAverage = (habits) => {
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

export const getStepsAverage = (habits) => {
  let sum = 0
  let count = 0
  for (let i = 0; i < 7; i++) {
    if(habits[i]&&habits[i].steps) {
      sum += Number(habits[i].steps)
      count++
    }
  }
  return Math.floor(sum/count)
}

export const getCalorieAverage = (habits) => {
  let sum = 0
  let count = 0
  for (let i = 0; i < 7; i++) {
    if(habits[i]&&habits[i].calories) {
      sum += Number(habits[i].calories)
      count++
    }
  }
  return Math.floor(sum/count)
}
