import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  import {Button} from "@/components/ui/button"




const DeletePopup = ({task, setShowDeletePopup}) => {

    const deleteHandler = async () => {
        const url = `http://localhost:8000/projects/${params.projectId}/tasks/${task.id}`
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
        router.push(`/projects/${params.projectId}/tasks`)
        router.refresh()
        setShowDeletePopup(false)
      }
    const cancelHandler = () => {
        setShowDeletePopup(false)
    }
  return (
    <div className={`fixed z-40 left-0 top-0 w-full min-h-screen rounded-none bg-black bg-opacity-60 `}>
    <Card className='fixed w-72 lg:w-[25vw] bg top-1/2 left-1/2 trans -translate-y-1/2 -translate-x-1/2' >
        <CardHeader>
        <CardTitle>Delete Task</CardTitle>
        </CardHeader>
        <CardContent>
        Are you sure you want to delete this task?
        </CardContent>
        <CardFooter className="flex justify-between"> 
            <Button onClick={cancelHandler} className="mx-auto" variant="secondary">Cancel</Button>    
            <Button onClick={deleteHandler} className="mx-auto" variant="destructive">Continue</Button>
        </CardFooter>
    </Card>
    </div>
  )
}

export default DeletePopup