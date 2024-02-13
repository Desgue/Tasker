import React from 'react'
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import awsExports from '../../aws-exports';
import NewProjectForm from './newProjectForm';
import {columns} from './columns';
import { DataTable } from './projectTable';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../App';


Amplify.configure(awsExports);

export const newProjectCtx = React.createContext() 

const ProjectsPage =  () => {
  const {user} = useAuthenticator(context => [context.user])
  

  return !user ? <Navigate href="/login"/> :  (
                  <>
                  <section className='min-w-screen min-h-screen w-full h-full flex flex-col pt-12'>
                    <div className='container h-full  text-center mx-auto'>
                        <p className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-5xl text-[#6200EE]'>Projects</p>
                        <p className='pt-4 scroll-m-20 text-xl font-semibold tracking-tight'>Create, edit, delete and manage your projects</p>
                    </div>
                    
                        <div className='container bg-white mx-auto mt-12 py-10  border rounded-lg shadow-xl'>
                        <div className='flex justify-between'>
                            <h1 className='text-3xl pb-4 font-bold text-left'>Projects</h1>
                            <NewProjectDialog />
                        </div>
                          <label className=' text-left'>List of projects</label>
                          <DataTable columns={columns} />
                        </div>
                    </section>
                    </>

                )  
  }
export default ProjectsPage

const NewProjectDialog = () => {
  const [open, setOpen] = React.useState()
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