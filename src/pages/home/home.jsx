import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from '@/components/ui/button';
const Home = () => {
  return (
    <>
    <section className='min-w-full min-h-screen h-screen '>
        <div className='container h-full pt-28 lg:pt-32 text-center mx-auto'>
          <h1 className='scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl text-[#6200EE]'>Tasker</h1>
          <h1 className='pt-4 scroll-m-20 text-4xl font-extrabold  tracking-tight lg:text-5xl'>Project management tool</h1>
          <p className='pt-8 scroll-m-20 text-xl font-semibold tracking-tight'>A free open-source minimalist alternative to Jira </p>
          <p className='pt-4 leading-7  '>
            Manage your projects and task from anywhere, perfect for personal projects, solo developers or small teams 
           </p>
          <div className='flex justify-center pt-12'>
            <Link to='/profile'>
              <Button className='scroll-m-20 rounded-[8px]   px-8 py-3 text-lg font-semibold text-white bg-[#6200EE]  hover:bg-[#5a00da]'>Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className='min-w-full min-h-screen h-screen '>
        <div className='container h-full pt-28 lg:pt-32 text-center mx-auto '>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Our <span className='text-violet-600'> Features</span></h1>
          <p className='pt-12 scroll-m-20 text-xl font-semibold tracking-tight'>We have a minimalist approach to project management</p>
          <p className='pt-2 scroll-m-20 text-md font-medium tracking-tight'>Log your projects, create goals and hold yourself accountable while you develop your next big thing</p>

          <div className='flex lg:flex-row flex-col justify-center'>
            <div className='flex flex-col h- items-center pt-12 '>
              <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Project Management</h1>
              <p className='pt-4 scroll-m-20'>Create, edit, delete projects and assign tasks to your team members</p>
            </div>
            <div className='flex flex-col pt-12 items-center'>
              <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Task Management</h1>
              <p className='pt-4 scroll-m-20'>Create, edit, delete tasks and assign them to your different projects</p>
            </div>
            <div className='flex flex-col items-center pt-12'>
              <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Board View</h1>
              <p className='pt-4 scroll-m-20'>View all your tasks in a board view, drag and drop tasks to change their status</p>
            </div>
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Home