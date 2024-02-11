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
 
const ProfileDropdown = () => {
    const {signOut} = useAuthenticator(context => [context.signOut])
    const {user} = useAuthenticator(context => [context.user])
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" className="mt-2  mr-2 w-8 h-8 rounded-full cursor-pointer " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuGroup className="h-16 bg-neutral-50">
        <div className='h-full'>

        <DropdownMenuLabel className="text-lg text-pretty"> Welcome, {user.username}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-md text-pretty pt-[-12px] mb-8"> someemail@email.com</DropdownMenuLabel>
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

export default ProfileDropdown