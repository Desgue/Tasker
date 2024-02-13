
import * as React from "react";
import {Link} from 'react-router-dom'
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { deleteProject, editProject } from "../../service/api"
import { TokenContext } from "../../App"

  
const openContext = React.createContext()


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
                      <DialogTitle >Edit</DialogTitle>
                       <EditForm project = {project}/>  
                    </DialogItem>

                    <DialogItem  triggerChildren="Delete">
                      <DialogTitle >Delete</DialogTitle>
                      <DialogDescription >
                        Deleting this project will also delete all the tasks associated with it. Are you sure you want to delete it?
                      </DialogDescription>
                      <DialogFooter>
                          <DeleteBtn project = {project} />
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
const DeleteBtn = ({project}) => {
  const context = React.useContext(openContext)
  const tokens = React.useContext(TokenContext)
  return (
    <Button onClick={() =>{ 
      deleteProject(project.id, tokens)
      .then(() => {
        console.log('Project deleted');
        context.setOpen(false);
        window.location.reload();
        })
      }} 
        variant="secondary">
          Delete
    </Button>
  )
    }

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

  const EditForm = ({project}) => {
    const context = React.useContext(openContext)
    const token   = React.useContext(TokenContext)
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
    const onSubmit = (data) => {
      editProject( data, project.id, token)
      .then(() => {
        console.log('Project edited');
        context.setOpen(false);
        window.location.reload();
      })
    }
    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <SelectContent className="bg-white ">
                            <SelectItem className="cursor-pointer bg-slate-50" value="Low">Low</SelectItem>
                            <SelectItem className="cursor-pointer" value="Medium">Medium</SelectItem>  
                            <SelectItem className="cursor-pointer" value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>Select the priority status</FormDescription>
                    <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                </FormItem>  
            )} />
                <div className="flex justify-between pt-4">
                <DialogClose asChild>
                    <Button type="button " className="bg-[#6200EE] w-[64px] rounded-[8px] text-white hover:bg-[#5f19c2]">Cancel</Button>
                </DialogClose>
                    <Button type="submit"  className="bg-[#6200EE] w-[64px] rounded-[8px] text-white hover:bg-[#5f19c2]"  >Edit</Button>
                </div>
            </form>          
    </Form>
    );
  }