import React from 'react'
import {getTasks} from '../../service/api'
import {TokenContext} from '../../App'
import { useParams } from 'react-router-dom'
import DataTable  from '../../components/DataTable'
import columns from './columns'

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

   if (tasks) { return (
    <main className='pt-36'>
      <div className='container mx-auto mt-12 py-10  border rounded-lg shadow-xl'>
        <DataTable data={tasks} columns={columns} filterBy="description"/>
      </div>
    </main>
  )
  } 
}

export default TasksPage