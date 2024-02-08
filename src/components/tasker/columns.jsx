
import * as React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Link} from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
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
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"



const deleteProject = async (id) => {
    const url = `http://localhost:8000/projects/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok ){
        console.log(`Project with id: ${id} has been deleted`)
        }

}

export const columns = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'priority',
        
        header: "Priority"
    },

    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },

    {   
        
        id: 'actions',
        cell: ({row}) => {
            const project = row.original
            return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DialogItem triggerChildren="Edit">
                      <DialogTitle >Edit</DialogTitle>
                       <EditForm project = {project} />  
                    </DialogItem>

                    <DialogItem triggerChildren="Delete">
                      <DialogTitle >Delete</DialogTitle>
                      <DialogDescription >
                        Deleting this project will also delete all the tasks associated with it. Are you sure you want to delete it?
                      </DialogDescription>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button onClick={() => deleteProject(project.id)} variant="">Delete</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem >
                        <Link to={`/projects/${project.id}/tasks`}>
                        Open Tasks
                        </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
    
    
]
const openContext = React.createContext()
const DialogItem = React.forwardRef((props, forwardedRef) => {
  const [open, setOpen] = React.useState()
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            {...itemProps}
            ref={forwardedRef}
            className="DropdownMenuItem"
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
          <DialogContent >
            <openContext.Provider value={{setOpen}}>
              {children}
            </openContext.Provider>
          </DialogContent>
      </Dialog>
    );
  });

  const EditForm = ({project}) => {
      const context = React.useContext(openContext)
      
      const router = useRouter()
      const editProject =  async (data) => {
        console.log('Editing project with id: ', project.id)
        const url = `http://localhost:8000/projects/${project.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok ){
            console.log(`Project with id: ${project.id} has been edited`)
        }
        context.setOpen(false)
        router.push("/projects")
        router.refresh()
    }
    const formSchema = z.object({
        title: z.string().min(2, {
            message: 'Title must be at least 2 characters long'
        }).max(50),
        description: z.string().min(10, {
            message: 'Description must be at least 10 characters long'
        }).max(400),
        priority: z.enum(['Low', 'Medium', 'High'], {required_error: 'Status is required'})
      })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: project.title,
            description: project.description,
            priority: project.priority
        }
    })
    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(editProject)}>
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
                    <FormLabel>Priority Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue  />
                                </SelectTrigger>
                            </FormControl>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>  
                            <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>Select the priority status</FormDescription>
                    <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                </FormItem>  
            )} />
                <div className="flex justify-between">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                    <Button  type="submit" variant="">Edit</Button>
                </div>
            </form>          
    </Form>
    );
  }