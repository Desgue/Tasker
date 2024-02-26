import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Link, redirect } from 'react-router-dom'
  
export default function ProfileSheet () {
    const {signOut} = useAuthenticator(context => [context.signOut])
    const {user} = useAuthenticator(context => [context.user])
    const [userAttributes, setUserAttributes] = React.useState(null);

  React.useEffect(() => {
    fetchUserAttributes()
    .then((attributes) => {
      setUserAttributes(attributes);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  , [])
  if (user && userAttributes){
    return (
    <Sheet key="left">
        <SheetTrigger>
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" className="mt-2  mr-2 w-8 h-8 rounded-full cursor-pointer " />
        </SheetTrigger>
        <SheetContent className="w-1/2">
            <SheetHeader>
              <SheetTitle>
                   <p>Welcome, <span className='text-[#6200EE]'>{user.username} </span></p>
                   <p className='text-sm text-neutral-500'>{userAttributes.email}</p>
              </SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-6 pt-12'>
                <Link to="/profile" className='  w-full h-6 text-center md:text-lg font-medium text-[#6200EE] border-b'>
                    Profile
                </Link>
                <Link to="/projects" className='w-full text-center md:text-lg font-medium text-[#6200EE] border-b'>
                    Projects
                </Link>
{/*                 <Link to="/profile" className='w-full text-center md:text-lg font-medium text-[#6200EE] border-b'>
                    Settings
                </Link>
                <Link to="/profile" className='w-full text-center md:text-lg font-medium text-[#6200EE] border-b'>
                    Help
                </Link> */}
                <Link to="/" className='w-full text-center md:text-lg font-medium text-[#6200EE] border-b'>
                    <button onClick={signOut}  className='  w-full text-center'>
                      Sign out
                    </button>
                </Link>

            </div>
        </SheetContent>
    </Sheet>

  )
    }
}