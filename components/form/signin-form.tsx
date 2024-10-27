import React from 'react'
import GoogleSignInButton from '../button/google-signin-button'

interface SignInFormProps {
    callbackUrl: string
}

const SignInForm = ({
    callbackUrl
}: SignInFormProps) => {
    return (
        <div>
            <GoogleSignInButton callbackUrl={callbackUrl}/>
        </div>
    )
}

export default SignInForm


