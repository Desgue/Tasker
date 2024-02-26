import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TokenContext } from '../../App'
import { createTask } from '../../service/api'
import { redirect, useNavigate } from 'react-router-dom'
import { DialogClose, DialogTrigger } from '@/components/ui/dialog'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useParams} from 'react-router-dom'




const NewTaskForm = ({setOpen}) => {
    const projectId = useParams().projectId
    const tokens = React.useContext(TokenContext)
    const navigate = useNavigate()
    const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long'
    }).max(50),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long'
    }).max(500),
    status: z.enum(['Pending', 'InProgress', 'Done'], {required_error: 'Status is required'})
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: ``,
        description: ``,
        status: `Pending`
    }
})
    const submitHandler = async (data) => {
    
        const newTask = {
          title: data.title,
          description: data.description,
          status: data.status,
          projectId: Number(projectId)
        }
        try {
        const res = await createTask(newTask, projectId, tokens)
        setOpen(false)
        navigate(0)


        }
        catch(err){
            console.log(err)
        }
    }
  return (
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
                                <SelectItem value="InProgress">In Progress</SelectItem>  
                                <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Select the status of the task</FormDescription>
                        <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                    </FormItem>  
                )} />
                <div className='flex justify-between pt-4'>
                    <DialogClose asChild>
                      <Button  type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button  type="submit" className="bg-[#6200EE] text-white">Submit</Button>
                </div>
                </form>
                 
        </Form>
  )
  
}

export default NewTaskForm