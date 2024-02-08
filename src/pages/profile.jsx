import React from 'react'
import {Authenticator} from '@aws-amplify/ui-react';
import {Button} from '../components/ui/button';

const ProfilePage = () => {

  return ( <> 
  <Authenticator className='pt-36 xl:pt-56 '>
    {({signOut, user}) => {
      if (user) {
        return (
          <div className='container pt-24'>
            <p className='text-4xl font-medium'>Welcome, {user.username}</p>
            <Button
              className="scroll-m-20 rounded-[8px] mt-6 px-8 py-3 text-lg font-semibold text-white bg-[#6200EE]  hover:bg-[#5a00da]"
              onClick={signOut}>Sign out</Button>
          </div>
         );
       }
     }
   }
  </Authenticator> </>
  )
}

export default ProfilePage