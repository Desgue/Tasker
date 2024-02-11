import React from 'react'
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import {Button} from '../../components/ui/button';
import { Separator } from "@/components/ui/separator"
import EditProfileForm from './editProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { redirect } from 'react-router-dom';

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
    return userAttributes;
  } catch (error) {
    console.log(error);
  }
}



const ProfilePage = () => {
  const {user} = useAuthenticator(context => [context.user]);
  console.log(user);
  const [userAttributes, setUserAttributes] = React.useState(null);

  React.useEffect(() => {
    handleFetchUserAttributes()
    .then((attributes) => {
      setUserAttributes(attributes);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  , [])


      if (user && userAttributes) {
        return (
          <>
            <div className=' pl-[40px] pr-16 pt-[26px] pb-[26px] mb-6'>
              <div className='flex flex-row w-full'>
                <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" className="mt-4 mr-2 w-12 h-12 rounded-full " />
                <div className='flex flex-col'>
                  <p className='text-xl font-medium pt-4'>{user.username}</p>
                  <p className='text-sm font-medium'>{userAttributes.email}</p>
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
                  <EditProfileForm user={user} attributes={userAttributes}/>
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
       redirect('/login')
      }
     

  


export default ProfilePage