const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001'

export const fetchTodoLists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todolists`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

export const updateTodoList = async (id, updatedList) => {
  try {
    const response = await fetch(`${BASE_URL}/todolists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to update the todo list:', error)
    throw error
  }
}
