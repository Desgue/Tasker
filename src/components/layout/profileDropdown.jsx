import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { capitalizeFirstLetter } from '../../service/utils';


 
const ProfileDropdown = () => {
    const {signOut} = useAuthenticator(context => [context.signOut])
    const {user} = useAuthenticator(context => [context.user])
    const [userAttributes, setUserAttributes] = React.useState(null);
    const [open, setOpen] = React.useState(false);

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
      <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" className="mt-2  mr-2 w-8 h-8 rounded-full cursor-pointer " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuGroup className="h-16 bg-neutral-50">
        <div className='h-full'>
          <DropdownMenuLabel className="text-lg   "> 
            Welcome, <span className='text-[#6200EE]'>{ capitalizeFirstLetter(user.username)} </span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-base "> 
          {userAttributes.email}
          </DropdownMenuLabel>
        </div>
      
        </DropdownMenuGroup>
        <DropdownMenuSeparator  />
        <DropdownMenuGroup >
          <DropdownMenuItem onClick={() => setOpen(false) } >
            <Link to="/projects" className='  w-full h-6 text-left'>
              Projects
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(false) } >
          <Link to="/settings" className='w-full text-left'>
          Settings
        </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>

          <Link to="/" className='w-full text-left'>
    
          <button onClick={signOut} className='  w-full text-left'>
            Sign Out
        </button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
}

export default ProfileDropdown