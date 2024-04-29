import React, { Fragment, useState } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { TodoListForm } from './TodoListForm'
import { useTodoLists } from '../useTodoLists'

export const TodoLists = ({ style }) => {
  const [activeList, setActiveList] = useState()
  const { todoLists, handleTodoListUpdate, allDone } = useTodoLists()

  if (!Object.keys(todoLists).length) return null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>{allDone[key] ? <DoneAllIcon /> : <ReceiptIcon />}</ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={handleTodoListUpdate}
        />
      )}
    </Fragment>
  )
}
