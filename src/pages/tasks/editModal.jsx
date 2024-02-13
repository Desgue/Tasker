import React, {useEffect, useState} from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"
  import { useParams } from "react-router-dom"
  import { useNavigate } from "react-router-dom"
  import { editTask } from "../../service/api"
  import { TokenContext } from "../../App"




const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long'
    }).max(50),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long'
    }).max(500),
    status: z.enum(['Pending', 'InProgress', 'Done'], {required_error: 'Status is required'})
  })



const EditTaskModal =  ({task, setShowEditForm}) => {
  const tokens = React.useContext(TokenContext)
  const projectId = useParams().projectId
    useEffect(() => {
        console.log('Modal component rendered')

        document.body.style.overflow = 'hidden'
        document.addEventListener("keydown", (e) => { 
          if (e.key === "Escape") {
            console.log('Escape key pressed')
            setShowEditForm(false)
          }
        }
        )
      }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: `${task.title}`,
            description: `${task.description}`,
            status: `${task.status}`
        }
    })

  const cancelHandler = () => {
    setShowEditForm(false)
  }

  const submitHandler = async (data) => {
    try {
      const editedTask = {
        title: data.title,
        description: data.description,
        status: data.status,
      }
      const response = await editTask(editedTask, projectId, task.id, tokens)

      if (response.ok) setShowEditForm(false)

    }
    catch(err){
      console.log(err)
    }
  }


  return ( 
  <>
  <div className={`fixed z-40 left-0 top-0 w-full min-h-screen rounded-none bg-black bg-opacity-60 `}>
    <Card className='fixed w-72 lg:w-[25vw] bg top-1/2 left-1/2 trans -translate-y-1/2 -translate-x-1/2' >
      <CardHeader>
        <CardTitle>Edit Task</CardTitle>
        <CardDescription>Edit title, description and status</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <FormField name="title" control={form.conrtrol} render={({field}) => (
                     <FormItem >
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Title" {...field} />
                        </FormControl>
                     </FormItem>  
                )} />
                <FormField name="description" control={form.control} render={({field}) => (
                     <FormItem >
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Write the task description here" {...field}/>
                        </FormControl>
                     </FormItem>  
                )} />
                <FormField name="status" control={form.control} render={({field}) => (
                    <FormItem >
                        <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue  />
                                    </SelectTrigger>
                                </FormControl>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="InProgress">InProgress</SelectItem>  
                                <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Select the status of the task</FormDescription>
                        <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                    </FormItem>  
                )} />
                <div className='flex justify-between'>
                    <Button onClick={cancelHandler} className="" variant="">Cancel</Button>
                    <Button  type="submit" className="" variant="secondary">Edit</Button>
                </div>
                </form>
                 
        </Form>
      </CardContent>    
    </Card>
    </div> 
  </>
  )
}

export default EditTaskModal