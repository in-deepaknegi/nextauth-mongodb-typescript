'use client'
import { signIn } from 'next-auth/react'

interface GoogleSignInButtonProps {
    callbackUrl: string
}
const GoogleSignInButton = ({
    callbackUrl
}: GoogleSignInButtonProps) => {

    const loginWithGoogle = async () => {
        await signIn("google", { callbackUrl })
    }

    return (
        <button onClick={loginWithGoogle} className="w-full">
            Sign in with Google
        </button>
    )
}

export default GoogleSignInButton