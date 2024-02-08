import React from 'react'
import { Authenticator,useAuthenticator  } from '@aws-amplify/ui-react';

const ProfilePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <>
    {user ? <div className='text-center mt-24 container mx-auto'>Hello {user.username}</div> : <div className='mt-24'>Please log in</div>}

    </>
  )
}

export default ProfilePage