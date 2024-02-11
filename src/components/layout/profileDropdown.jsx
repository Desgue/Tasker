import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';


 
const ProfileDropdown = () => {
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
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" className="mt-2  mr-2 w-8 h-8 rounded-full cursor-pointer " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuGroup className="h-16 bg-neutral-50">
        <div className='h-full'>

        <DropdownMenuLabel className="text-lg   "> Welcome, <span className='text-[#6200EE]'>{user.username} </span></DropdownMenuLabel>
        <DropdownMenuLabel className="text-base "> {userAttributes.email}</DropdownMenuLabel>
        </div>
      
        </DropdownMenuGroup>
        <DropdownMenuSeparator  />
        <DropdownMenuGroup >
          <DropdownMenuItem >
            <Link to="/profile" className='  w-full h-6 text-left'>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem >
          <Link to="/projects" className='w-full text-left'>
          Projects
        </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={signOut} className='  w-full text-left'>
          Log out
        </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
}

export default ProfileDropdown