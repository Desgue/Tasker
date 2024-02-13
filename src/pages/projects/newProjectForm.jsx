import React from "react"
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
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createProject } from "../../service/api"
import { TokenContext } from "../../App"
import { newProjectCtx } from "./ProjectsPage"
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long'
    }).max(50),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long'
    }).max(500),
    priority: z.enum(['Low', 'Medium', 'High'], {required_error: 'Priority status required'})
  })


const NewProjectForm =  () => {  
    const tokens = React.useContext(TokenContext)
    const context = React.useContext(newProjectCtx)
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ``,
            description: ``,
            priority: `Low`
        }
    })
    
    return (
    
    <Form {...form}>
            <form onSubmit={form.handleSubmit(data =>{ 
                createProject(data, tokens)
                .then((resp) => {

                    context.setOpen(false);
                    navigate(0);
                })
            }
            )}>
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
                <FormField name="priority" control={form.control} render={({field}) => (
                    <FormItem >
                        <FormLabel>Status</FormLabel>
                            <Select  className="hover:bg-black" onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue  />
                                    </SelectTrigger>
                                </FormControl>
                            <SelectContent className="bg-white" >
                                <SelectItem className="cursor-pointer " value="Low">Low</SelectItem>
                                <SelectItem  className="cursor-pointer" value="Medium">Medium</SelectItem>  
                                <SelectItem className="cursor-pointer" value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Select the priority status of the task</FormDescription>
                        <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                    </FormItem>  
                )} />
                <div className='flex justify-between'>
                <DialogClose asChild>
                    <Button type="button " className="bg-[#6200EE] w-[64px] rounded-[8px] text-white hover:bg-[#5f19c2] p-4 mt-2">Cancel</Button>
                </DialogClose>
                    <Button  type="submit" className="bg-[#6200EE] rounded-[8px] text-white hover:bg-[#5f19c2] p-4 mt-2" variant="secondary">Create</Button>
                </div>
                </form>
                 
        </Form>
    )
}
export default NewProjectForm;