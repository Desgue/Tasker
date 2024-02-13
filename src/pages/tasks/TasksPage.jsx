import React from 'react'
import Board from "./board"
import BoardSider from './boardSider'
import {getTasks} from '../../service/api'
import {TokenContext} from '../../App'
import { useParams } from 'react-router-dom'

const TasksPage = () => {
  const tokens = React.useContext(TokenContext)
  const [tasks, setTasks] = React.useState([])
  const projectId = useParams().projectId

  React.useEffect(() => {
    document.title = 'Tasks'
    getTasks(projectId, tokens)
    .then((tasks) => {
      setTasks(tasks)
    })
    .catch((err) => {
      console.log(err)
    })  
  }
  , [])

  return  (
    <main className='pt-36'>
        <div className='flex flex-row gap-8'>
        <BoardSider />
        <Board tasks={tasks} />
        </div>
    </main>
  )
}

export default TasksPage