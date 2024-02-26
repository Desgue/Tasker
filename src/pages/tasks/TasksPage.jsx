import React from 'react'
import DataTable  from '../../components/DataTable'
import columns from './columns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button"
import NewTaskForm from './NewTaskForm'
import {Authenticator } from '@aws-amplify/ui-react';


const TasksPage = () => {
    return (
    <Authenticator>

    <main className="pt-24">
      <h1 className='text-3xl font-bold text-center text-[#6200EE]'></h1>
      <div className='container mx-auto mt-12 py-10  border rounded-lg shadow-xl'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-2 items-start '>
            <h1 className='text-3xl font-bold text-center text-[#6200EE]'>Tasks</h1>
            <h3 className='pt-2 text-xs md:text-md font-semibold text-left md:text-center text-primary'>Manage your tasks</h3>
          </div>
         <NewTaskDrawer className="lg:hidden"/> 
        <NewTaskDialog className="hidden lg:flex" />
        </div>

        <DataTable  columns={columns} filterBy="description"/>
      </div>
    </main>
    </Authenticator>
  )
  } 


const NewTaskDialog = ({className}) => {
  const [open, setOpen] = React.useState()

return (
    <Dialog open={open} >
      <DialogTrigger asChild>
          <Button className={` ${className} !mb-4 !font-semibold  !bg-[#6200EE] !rounded-[8px] !text-white hover:bg-[#5f19c2]`}>New Task</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
            <NewTaskForm setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )

  
  
}

const NewTaskDrawer = ({className}) => {
  const [open, setOpen] = React.useState()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={` ${className} !mb-4 !font-semibold  !bg-[#6200EE] !rounded-[8px] !text-white hover:bg-[#5f19c2]`}>New Task</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="pl-4">Create New Task</DrawerTitle>
        </DrawerHeader>
        <div className='container pb-4'>
          <NewTaskForm setOpen={setOpen}/>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default TasksPage