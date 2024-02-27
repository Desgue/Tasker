import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { set } from 'react-hook-form';
const Home = () => {
  const [showModal, setShowModal] = React.useState(false)
  const handleModal = () => {
    const timer = setTimeout(() => {
      setShowModal(!showModal)
      
    }, 1000)
    return () => clearTimeout(timer)
    
  }

  React.useEffect(() => {
    handleModal()
    document.addEventListener('click', () => setShowModal(false))
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') {
        setShowModal(false)
      }
    })
  }, [])
  return (
    <>

    <section className='min-w-full min-h-screen h-screen  '>
        <Modal className={showModal? "" : "hidden"} />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className='container flex flex-col justify-center h-full items-center mx-auto '>
          <h1 className=' text-5xl font-extrabold tracking-tight lg:text-6xl text-[#6200EE]'>Tasker</h1>
          <h1 className='pt-4 text-4xl font-extrabold  tracking-tight lg:text-5xl'>Project management tool</h1>
          <p className='pt-8  text-xl font-semibold tracking-tight'>A free open-source minimalist alternative to Jira </p>
          <p className='pt-4 leading-7 font-medium  '>
            Manage your projects and task from anywhere, perfect for personal projects, solo developers or small teams 
           </p>
           
          <div className='flex justify-center pt-12'>
            <Link to='/profile'>
              <Button className=' rounded-[8px]   px-8 py-3 text-lg font-semibold text-white bg-[#6200EE]  hover:bg-[#5a00da]'>Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className='min-w-full min-h-screen h-screen '>
        <div className='container flex flex-col h-full text-center justify-center '>
          <div className=''>
            <h1 className=' text-4xl font-extrabold tracking-tight lg:text-5xl'>Our <span className='text-violet-600'> Features</span></h1>
            <p className='pt-12  text-xl font-semibold tracking-tight'>We have a minimalist approach to project management</p>
            <p className='pt-2  text-md font-medium tracking-tight'>Log your projects, create goals and hold yourself accountable while you develop your next big thing</p>
          </div>

          <div className='flex gap-4 lg:flex-row flex-col justify-center'>
            <div className='flex flex-col h- items-center pt-12 '>
              <h1 className=' text-2xl font-semibold tracking-tight'>Project Management</h1>
              <p className='pt-4 '>Create, edit, delete projects and assign tasks to your team members</p>
            </div>
            <div className='flex flex-col pt-12 items-center'>
              <h1 className=' text-2xl font-semibold tracking-tight'>Task Management</h1>
              <p className='pt-4 '>Create, edit, delete tasks and assign them to your different projects</p>
            </div>
{/*             <div className='flex flex-col items-center pt-12'>
              <h1 className=' text-2xl font-semibold tracking-tight'>Board View</h1>
              <p className='pt-4 '>View all your tasks in a board view, drag and drop tasks to change their status</p>
            </div> */}
          </div>
        </div>
        
      </section>

    </>
  )
}

export default Home

const Modal = ({className}) => {
  return (
    <div className={`${className} fixed flex top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-80 z-50  w-screen h-screen p-4`}>
      <div className='absolute top-12 right-12  hover:cursor-pointer '>
        <p className='text-white text-xl font-semibold'>X</p>
      </div>
        <Card className="self-center mx-auto">
  <CardHeader >
    <CardTitle className="text-2xl font-bold">Welcome to <span className='text-[#6200EE]'>Tasker</span></CardTitle>
    <CardDescription>This is a demo app</CardDescription>
  </CardHeader>
  <CardContent className="gap-4 flex flex-col">
    <p className='text-base font-medium'>Please use the following credentials to test the app:</p>
    <p className='text-base font-medium'>Username: <span className='text-[#6200EE]'>Visitor</span></p>
    <p className='text-base font-medium'>Password: <span className='text-[#6200EE]'>Visitor123</span></p>
  </CardContent>
  <CardFooter className="flex flex-col ">
    <p className='text-sm font-medium'>If you wish, you can create your own account to test the app</p>
    <p className='text-sm font-medium'>All accounts and data are deleted in a monthly basis.</p>
  </CardFooter>
</Card>
    </div>
  )
}