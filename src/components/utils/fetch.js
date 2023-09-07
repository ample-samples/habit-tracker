export async function getHabitsByUser(userId, email) {
  const domain = process.env.REACT_APP_DB_DOMAIN
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: "POST",
    body: JSON.stringify({email, id: userId})
  }
  const newHabits = await fetch(`${domain}/habits/user`, options)
    .then((response) => response.json())
    console.log(`req`, newHabits)
  newHabits.sort((a, b) => a.date < b.date ? 1 : -1 )

  return newHabits
}
