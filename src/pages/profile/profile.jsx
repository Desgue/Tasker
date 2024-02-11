import React from 'react'
import {Authenticator} from '@aws-amplify/ui-react';
import {Button} from '../../components/ui/button';
import { Separator } from "@/components/ui/separator"
import EditProfileForm from './editProfileForm';
import ChangePasswordForm from './ChangePasswordForm';


const ProfilePage = () => {

  return ( <> 
  <Authenticator className='pt-36 xl:pt-56 '>
    {({signOut, user}) => {
      if (user) {
        return (
          <>
            <div className=' pl-[40px] pr-16 pt-[26px] pb-[26px] mb-6'>
              <div className='flex flex-row w-full'>
                <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" className="mt-4 mr-2 w-12 h-12 rounded-full " />
                <div className='flex flex-col'>
                  <p className='text-xl font-medium pt-4'>{user.username}</p>
                  <p className='text-sm font-medium'>somemeail@email.com</p>
                </div>
              </div>
            </div>
          <Separator className="w-[95%] mx-auto " />
            <section className="grid grid-cols-3 ">
              <div className="col-start-2 col-end-3 flex flex-col items-left pt-8">
                <p className="text-2xl font-bold">Account Settings</p>
                <div className="text-sm w-fit mt-4">
                  <p>
                    Manage your personal information, privacy, security, and account settings.
                  </p>         
                </div>
                <Separator className="mt-4"/>
                <div className="pt-8">
                  <h3 className="text-xl font-bold pb-2">Edit Profile</h3>
                  <EditProfileForm className=""/>
                </div>
                <div className="pt-16">
                  <h2 className="text-xl font-bold pb-2">Edit Password</h2>
                  <ChangePasswordForm />
                </div>
              </div>
            </section>
          </>
         );
       }
     }
   }
  </Authenticator> </>
  )
}

export default ProfilePage