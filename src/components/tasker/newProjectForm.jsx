import {  z } from "zod"
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
import { Button } from "@/components/ui/button"

  const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters long'
    }).max(50),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters long'
    }).max(500),
    priority: z.enum(['Low', 'Medium', 'High'], {required_error: 'Priority status required'})
  })

  const createProject = async (data, userId) => {
    const url = `http://localhost:8000/users/${userId}/projects`
    data.userCognitoId = userId
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    console.log(data)
    return result
  }


const NewProjectForm = ({userId}) => {  
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ``,
            description: ``,
            priority: `Low`
        }
    })
    const submitHandler = createProject;
    
    return (
    
    <Form {...form}>
            <form onSubmit={form.handleSubmit(data => submitHandler(data, userId))}>
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
                                <SelectItem  value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>  
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Select the priority status of the task</FormDescription>
                        <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                    </FormItem>  
                )} />
                <div className='flex justify-between'>
                    <Button  type="submit" className="bg-[#6200EE] rounded-[8px] text-white hover:bg-[#5f19c2] p-4 mt-2" variant="secondary">Edit</Button>
                </div>
                </form>
                 
        </Form>
    )
}
export default NewProjectForm;