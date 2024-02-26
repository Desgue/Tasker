import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { Navigate, redirect } from 'react-router-dom'

const LoginPage =   () => {
    React.useEffect(() => {
        document.title = 'Login'
        redirect('/projects')
    }
        , [])
    return (
    <Authenticator className='pt-48' >
        {({user}) => (
            <Navigate to='/projects'/>
      )}
    </Authenticator>
    )
}

export default LoginPage