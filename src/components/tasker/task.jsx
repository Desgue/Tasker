import React, { useEffect, useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import EditTaskModal from './editTaskModal'
import DeletePopup from './deletePopup'



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
    <Card className='w-[400px] h-fit rounded-sm shadow-sm hover:shadow-md'>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <p>{task.description}</p>
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