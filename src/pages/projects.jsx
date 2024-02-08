import React from 'react'
import {Button} from '@/components/ui/button';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { DataTable } from '../components/tasker/projectTable';
import {columns} from '../components/tasker/columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewProjectForm from '../components/tasker/newProjectForm';
Amplify.configure(awsExports);



const getProjects = async(userId) => {
    const url = `http://localhost:8000/users/${userId}/projects`
    console.log(userId)
    const response = await fetch(url, {
      next: {
        revalidate: 60
      },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      }, 
    } )
    const data = await response.json()
    
    return data
  }



const NewProjectDialog = ({ userId}) => {
  return (
  <Dialog className="rounded-xl" >
    <DialogTrigger asChild>
        <Button className='mb-4 font-semibold  bg-[#6200EE] rounded-[8px] text-white hover:bg-[#5f19c2]'>New project</Button>
    </DialogTrigger>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Create project</DialogTitle>
          <NewProjectForm  userId = {userId}/>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
</Dialog>
  )
}

const ProjectsPage =  () => {
    const { user, signOut } = useAuthenticator(context => [context.user])

    const [projects, setProjects] = React.useState([])
    React.useEffect(() => {
      if (user) {
        getProjects(user.userId).then((data) => setProjects(data))

      }
    }, [user])
    
    
  return (
    <Authenticator className='pt-36 xl:pt-56 '>
        {({ user}) => {
            if (user) {
                return (
                    <>
                    <section className='min-w-screen min-h-screen w-full h-full flex flex-col pt-36'>
                    <div className='container h-full  text-center mx-auto'>
                        <p className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-5xl text-[#6200EE]'>Projects</p>
                        <p className='pt-4 scroll-m-20 text-xl font-semibold tracking-tight'>Create, edit, delete and manage your projects</p>
                    </div>
                    
                        <div className='container bg-white mx-auto mt-12 py-10  border rounded-lg shadow-xl'>
                        <div className='flex justify-between'>
                            <h1 className='text-3xl pb-4 font-bold text-left'>Projects</h1>
                            <NewProjectDialog  userId = {user.userId}/>
                        </div>
                          <label className=' text-left'>List of projects</label>
                          <DataTable columns={columns} data={projects}/>
                        </div>
                    
                </section>
                </>
                )
            }
        }
        }
    </Authenticator>
  )
}

export default ProjectsPage