import React, { useEffect, useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import EditTaskModal from './editModal'
import DeletePopup from './deleteModal'



const Task = ({task}) => {
  useEffect(() => { 
    console.log('Task component rendered')
    document.body.style.overflow = 'auto'
  })

  
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  
  return ( 
  <> 
  {showEditForm && <EditTaskModal task={task} setShowEditForm={setShowEditForm}/> }
  {showDeletePopup && <DeletePopup task={task}  setShowDeletePopup={setShowDeletePopup}/> }
    <Card className='w-full h-fit rounded-sm shadow-sm hover:shadow-md'>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <div className='flex flex-col'>
        <p className='text-lg font-medium'>{task.description}</p>
        <p className='text-xs pt-12'> Created At: {new Date(task.createdAt).toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={setShowDeletePopup} className="mx-auto" variant="">Delete</Button>
        <Button onClick={setShowEditForm} className="mx-auto" variant="secondary">Edit</Button>
      </CardFooter>
    </Card> 
  </>
  )
}

export default Task