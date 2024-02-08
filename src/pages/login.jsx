import React from 'react'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { redirect } from 'react-router-dom'

const LoginPage =   () => {
    const { route } = useAuthenticator(context => [context.route]);
    React.useEffect(() => {
        if (route === "confirmSignIn" || route === "authenticated") {
            window.location.href = "/"
        }
    }, [route])
    
    return (
        <Authenticator className='pt-48' />
    )
}

export default LoginPage