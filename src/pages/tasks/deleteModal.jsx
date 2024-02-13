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
  import { useNavigate, useParams } from "react-router-dom"
  import { deleteTask } from "../../service/api"
  import { TokenContext } from "../../App"





const DeletePopup = ({task, setShowDeletePopup}) => {
  const tokens = React.useContext(TokenContext)
  const projectId = useParams().projectId
  const navigate = useNavigate()
    const deleteHandler = async () => {
        try{
            const response = await deleteTask(projectId, task.id, tokens)
            if(response.ok){
            console.log('Task deleted')
            setShowDeletePopup(false)
            navigate(`/projects/${projectId}/tasks`)
            }
        }
        catch(err){
            console.log(err)
        }
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