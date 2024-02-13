import React from 'react'
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
  import { TokenContext } from '../../App'
import { deleteTask } from '../../service/api'


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
                      <DialogTitle >Edit</DialogTitle>
                       {/* <EditForm task = {task}/>   */}
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