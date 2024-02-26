import React from 'react'
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import '@aws-amplify/ui-react/styles.css';
import NewProjectForm from './newProjectForm';
import {columns} from './columns';
import { DataTable } from './projectTable';
import { Authenticator } from '@aws-amplify/ui-react';


export const newProjectCtx = React.createContext() 
const ProjectsPage =  () => {  

   return (
    <Authenticator>
     <section className='min-w-screen min-h-screen w-full h-full flex flex-col pt-12'>
       <div className='container h-full  text-center mx-auto'>
           <p className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-5xl text-[#6200EE]'>Projects</p>
           <p className='pt-4 scroll-m-20 text-xl font-semibold tracking-tight'>Create, edit, delete and manage your projects</p>
       </div>
       
           <div className='container  bg-white mx-auto mt-12 py-10  border rounded-lg shadow-xl'>
             <div className='flex justify-between'>
                 <h1 className='text-3xl pb-4 font-bold text-left'>Projects</h1>
                 <NewProjectDialog />
             </div>
             <label className='text-sm font-light  text-left'>List of projects</label>
             <DataTable columns={columns} />
           </div>
       </section>
    </Authenticator>

   )  
  }
export default ProjectsPage

const NewProjectDialog = () => {
  const [open, setOpen] = React.useState()
  const isDesktop = window.innerWidth > 1024;
  if(isDesktop) {
    return (
    <Dialog open={open} >
    <DialogTrigger asChild>
        <Button className='mb-4 font-semibold  bg-[#6200EE] rounded-[8px] text-white hover:bg-[#5f19c2]'>New project</Button>
    </DialogTrigger>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Create project</DialogTitle>
      </DialogHeader>
        <newProjectCtx.Provider value={{setOpen}}>
          <NewProjectForm/>
        </newProjectCtx.Provider>
    </DialogContent>
</Dialog>
  )
    }
    return (
      <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <Button className='mb-4 font-semibold  bg-[#6200EE] rounded-[8px] text-white hover:bg-[#5f19c2]'>New project</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left container pl-8">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className='container pb-4'>
          <newProjectCtx.Provider value={{setOpen}}>
            <NewProjectForm/>
          </newProjectCtx.Provider>
        </div>
      </DrawerContent>
    </Drawer>
    )
}

