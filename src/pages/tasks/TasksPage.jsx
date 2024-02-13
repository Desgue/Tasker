import React from 'react'
import {getTasks} from '../../service/api'
import {TokenContext} from '../../App'
import { useParams } from 'react-router-dom'
import DataTable  from '../../components/DataTable'
import columns from './columns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import NewTaskForm from './NewTaskForm'


const TasksPage = () => {
  const tokens = React.useContext(TokenContext)
  const [tasks, setTasks] = React.useState([])
  const projectId = useParams().projectId


  React.useEffect(() => {
    document.title = 'Tasks'
    getTasks(projectId, tokens)
    .then((tasks) => {
      tasks.map((task) => {
        task.createdAt = new Date(task.createdAt).toLocaleString()
      }
      )
      setTasks(tasks)
    })
    .catch((err) => {
      console.log(err)
    })  
  }
  , [])

  

   if (tasks) { return (
    <main className="pt-24">
      <h1 className='text-3xl font-bold text-center text-[#6200EE]'></h1>
      <div className='container mx-auto mt-12 py-10  border rounded-lg shadow-xl'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-2 items-start '>
            <h1 className='text-3xl font-bold text-center text-[#6200EE]'>Tasks</h1>
            <h3 className='pt-2 text-md font-semibold text-center text-primary'>Manage your tasks, edit update, assigned to a team member.</h3>
          </div>
        <NewTaskDialog/>
        </div>

        <DataTable data={tasks} columns={columns} filterBy="description"/>
      </div>
    </main>
  )
  } 
}

const NewTaskDialog = () => {
  const [open, setOpen] = React.useState()
  return (
    <Dialog open={open} >
    <DialogTrigger asChild>
        <Button className='!mb-4 !font-semibold  !bg-[#6200EE] !rounded-[8px] !text-white hover:bg-[#5f19c2]'>New Task</Button>
    </DialogTrigger>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Create project</DialogTitle>
      </DialogHeader>
          <NewTaskForm/>
    </DialogContent>
</Dialog>
  )
}

export default TasksPage