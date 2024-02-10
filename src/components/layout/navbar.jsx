

import React from 'react'
import {Link} from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react';
const LoggedOut = () => {
    
    return(
      <header className='flex fixed w-full bg-white h-12 z-40 justify-between border '>
        <div className='mt-2 ml-12'>
          <Link to='/'>
            <p className='text-2xl font-extrabold tracking-tigh text-[#6200EE]'>Tasker</p>
            
          </Link>
        </div>
        <div className='flex flex-row gap-12 mt-3 mr-8'>
          <Link to='/'>
            <p className='font-medium text-[#6200EE]'>Home</p>
          </Link>
          
          <Link to='/'>
            <p className='font-medium text-[#6200EE]'>About us</p>
          </Link>
          <Link to='/'>
            <p className='font-medium text-[#6200EE]'>Contact</p>
          </Link>
  
          <Link to='/login'>
              <p className='font-medium text-[#6200EE]'>Login</p>
          </Link>
          
        </div>
      </header>
    )
  }
  const LoggedIn = ({signOut}) => {
    return(
      <header className='flex fixed w-full bg-white h-12 z-40 justify-between border  '>
        <div className='mt-2 ml-12'>
          <Link to='/'>
            <p className='text-2xl font-extrabold tracking-tigh text-[#6200EE]'>Tasker</p>
            
          </Link>
        </div>
        <div className='flex flex-row gap-12 mt-3 mr-8'>
          <Link to='/'>
            <p className='font-medium text-[#6200EE]'>Home</p>
          </Link>
          
          <Link to='/projects'>
            <p className='font-medium text-[#6200EE]'>Projects</p>
          </Link>
          <Link to='/profile'>
            <p className='font-medium text-[#6200EE]'>Profile</p>
          </Link>
  
          <Link to='/' >
              <button onClick={signOut}> 
                <p className='font-medium text-[#6200EE]'>Logout</p>
              </button>
          </Link>
          
        </div>
      </header>
    )
  }
  const Navbar = () => {
    const {authStatus} = useAuthenticator(context => [context.authStatus]);
    const {signOut} = useAuthenticator(context => [context.signOut]);
    console.log(authStatus)
    return (
      <>
        {authStatus === 'authenticated' ? <LoggedIn signOut={signOut}/> : <LoggedOut/>}
      </>
    )
  }
  
  export default Navbar