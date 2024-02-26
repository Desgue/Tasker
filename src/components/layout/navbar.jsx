

import React from 'react'
import {Link} from 'react-router-dom'
import ProfileDropdown from './profileDropdown';
import ProfileSheet from './profileSheet';
const LoggedOut = () => {
    
    return(
      <header className='flex top-0  sticky w-full bg-white border-b h-16 z-40 justify-between  '>
        <div className='mt-4 ml-12'>
          <Link to='/'>
            <p className='text-2xl font-extrabold tracking-tigh text-[#6200EE]'>Tasker</p>
            
          </Link>
        </div>
        <div className='flex flex-row gap-12 mt-3 mr-8'>
          <Link to='/login' className='mt-2 cursor-pointer'>
            <p className='font-medium text-[#6200EE]'>Login</p>
          </Link>
          
        </div>
      </header>
    )
  }
  const LoggedIn = () => {
    
    return(
      <header className='flex w-full top-0  sticky bg-white h-12 z-40 justify-between border '>
        <div className='mt-2 ml-12'>
          <Link to='/'>
            <p className='text-2xl font-extrabold tracking-tigh text-[#6200EE]'>Tasker</p>
            
          </Link>
        </div>
        <ProfileDropdown/>       

      </header>
    )
  }
  const Navbar = ({isLogged}) => {
    return (
      <>
        {isLogged ? <LoggedIn/> : <LoggedOut/>}
      </>
    )
  }
  
  export default Navbar