import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [{ text: 'First todo of first list!', completed: false }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{ text: 'First todo of second list!', completed: false }],
  },
}

app.get('/', (req, res) => res.send('Todo API'))

app.get('/todolists', (req, res) => {
  res.json(todoLists)
})

app.put('/todolists/:id', (req, res) => {
  const { id } = req.params
  const updatedList = req.body
  if (!todoLists[id]) {
    res.status(404).send('Todo list not found')
    return
  }

  todoLists[id] = updatedList
  res.status(200).send(todoLists[id])
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
