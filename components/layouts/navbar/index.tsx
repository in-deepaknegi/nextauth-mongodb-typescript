"use client"
import { mainNavLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const pathName = usePathname()
    const { data: session } = useSession();
    // console.log(session)

    const signout = () => {
        signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/signin`
        })
    }

    return (
        <div className='mx-auto max-w-[80%]'>
            <div className='flex items-center py-6 border-b border-gray-400'>
                {
                    mainNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.url}
                            className={`block py-2 px-4 text-base transition-colors ${pathName === link.url ? "text-black dark:text-white" : "text-muted-foreground"}`}
                        >
                            {link.title}
                        </Link>
                    ))
                }

                <div className='ml-auto '>
                    {session ? (
                        <div className='flex gap-10'>
                            <p>
                                {session.user?.name}
                            </p>
                            <button onClick={signout}>
                                sign out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/signin" className='ml-auto'>
                                Sign In
                            </Link>
                        </>
                    )}
                </div >
            </div>
        </div>
    )
}

export default Navbar