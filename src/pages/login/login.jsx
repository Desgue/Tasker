import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { Navigate } from 'react-router-dom'

const LoginPage =   () => {
    return (
    <Authenticator className='pt-48' >
        {({ }) => (
            <Navigate to='/projects'/>
      )}
    </Authenticator>
    )
}

export default LoginPage