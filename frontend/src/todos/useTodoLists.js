import { useState, useEffect, useMemo } from 'react'
import { fetchTodoLists, updateTodoList } from '../api'

export function useTodoLists() {
  const [todoLists, setTodoLists] = useState({})

  useEffect(() => {
    async function loadTodoLists() {
      try {
        const data = await fetchTodoLists()
        if (data) {
          setTodoLists(data)
        }
      } catch (error) {
        console.error('Failed to fetch todo lists:', error)
      }
    }
    loadTodoLists()
  }, [])

  const handleTodoListUpdate = async (id, updatedList) => {
    try {
      setTodoLists((prevLists) => ({
        ...prevLists,
        [id]: updatedList,
      }))

      await updateTodoList(id, updatedList)
    } catch (error) {
      console.error('Failed to update todo list:', error)
    }
  }

  const allDone = useMemo(() => {
    const doneStatus = {}
    for (const id in todoLists) {
      doneStatus[id] = todoLists[id].todos.every((todo) => todo.completed)
    }
    return doneStatus
  }, [todoLists])

  return {
    todoLists,
    handleTodoListUpdate,
    allDone,
  }
}
