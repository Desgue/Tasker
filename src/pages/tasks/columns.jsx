import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { deleteTask } from '../../service/api'
import { editTask } from '../../service/api'


const openContext = React.createContext()
const columns = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'status',
        
        header: "Status"
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
            const task = row.original
            return (
                <DropdownMenu className="">
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white" align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DialogItem triggerChildren="Edit">
                      <DialogTitle className="text-[#6200EE] font-bold text-2xl">Edit</DialogTitle>
                       <EditForm task = {task}/>  
                    </DialogItem>

                    <DialogItem  triggerChildren="Delete">
                      <DialogTitle >Delete</DialogTitle>
                      <DialogDescription >
                        Are you sure you want to delete this task?
                      </DialogDescription>
                      <DialogFooter>
                          <DeleteBtn task = {task} />
                      </DialogFooter>
                    </DialogItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
    
    
]

const DialogItem = React.forwardRef((props, forwardedRef) => {
  const [open, setOpen] = React.useState()
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            {...itemProps}
            ref={forwardedRef}
            className="DropdownMenuItem   cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
          <DialogContent className="bg-white">
            <openContext.Provider value={{setOpen}}>
              {children}
            </openContext.Provider>
          </DialogContent>
      </Dialog>
    );
  });

const EditForm = ({task}) => {
  const context = React.useContext(openContext)
  const tokens = React.useContext(TokenContext)
  const Navigate = useNavigate()
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
        title: `${task.title}`,
        description: `${task.description}`,
        status: `${task.status}`
    }
})
const submitHandler = async (data) => {
  try {
    const editedTask = {
      title: data.title,
      description: data.description,
      status: data.status,
    }
    await editTask(editedTask, task.projectId, task.id, tokens)
    context.setOpen(false)
    Navigate(0)


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
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button  type="submit" className="bg-[#6200EE] text-white">Edit</Button>
                </div>
                </form>
                 
        </Form>
  )

}
  const DeleteBtn = ({task}) => {
    const context = React.useContext(openContext)
    const tokens = React.useContext(TokenContext)
    const projectId = task.projectId
    console.log(tokens)
    return (
      <Button onClick={() =>{ 
        deleteTask(projectId,task.id, tokens)
        .then(() => {
          context.setOpen(false);
          window.location.reload();
          })
        }} 
          variant="">
            Delete
      </Button>
    )
      }
export default columns