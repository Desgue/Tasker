import React from 'react'
import {Button} from '@/components/ui/button';
import { Amplify } from 'aws-amplify';
import { Authenticator,useAuthenticator  } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsExports);


const ProjectsPage = () => {
    const {route} = useAuthenticator(context => [context.route]);
    console.log(route);
  return (
    <Authenticator className='pt-36 xl:pt-56 '>
        {({signOut, user}) => {
            if (user) {
                return (
                    
                    <section className='min-w-screen min-h-screen w-full h-full flex flex-col'>
                        <div className='container mt-24'>
                        <p className='text-4xl font-medium'>Welcome, {user.username}</p>
                        <Button className="scroll-m-20 rounded-[8px] mt-6 px-8 py-3 text-lg font-semibold text-white bg-[#6200EE]  hover:bg-[#5a00da]" onClick={signOut}>Sign out</Button>
                    </div>
                    <div className='container h-full   pt-56 text-center mx-auto'>
                        <p className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-5xl text-[#6200EE]'>Projects</p>
                        <p className='pt-4 scroll-m-20 text-xl font-semibold tracking-tight'>Create, edit, delete and manage your projects</p>
                    </div>
                </section>
                )
            }
        }
        }
    </Authenticator>
  )
}

export default ProjectsPage