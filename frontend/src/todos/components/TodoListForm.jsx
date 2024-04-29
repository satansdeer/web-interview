import React, { useState, useRef } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { debounce } from '../../utils/debounce'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const debouncedSaveTodoList = useRef(
    debounce((id, updatedTodos) => {
      saveTodoList(id, { ...todoList, todos: updatedTodos })
    }, 500),
  ).current

  const updateAndSyncState = (newListValue) => {
    setTodos(newListValue)
    debouncedSaveTodoList(todoList.id, newListValue)
  }

  const handleTextChange = (index, text) => {
    const updatedTodo = { ...todos[index], text }
    const newListValue = [...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)]
    updateAndSyncState(newListValue)
  }

  const toggleCompleted = (index, completed) => {
    const updatedTodo = { ...todos[index], completed }
    const newListValue = [...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)]
    updateAndSyncState(newListValue)
  }

  const handleRemoveTodo = (index) => {
    const newListValue = [...todos.slice(0, index), ...todos.slice(index + 1)]
    updateAndSyncState(newListValue)
  }

  const handleAddTodo = () => {
    const newTodo = { text: '', completed: false }
    const newListValue = [...todos, newTodo]
    updateAndSyncState(newListValue)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={todo.completed}
                onChange={(event) => toggleCompleted(index, event.target.checked)}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => handleTextChange(index, event.target.value)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => handleRemoveTodo(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAddTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
