import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { signInWithOauth } from "@/lib/actions/auth.actions"

export const nextauthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin", // app/signin
        error: "/error", // app/error
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            // console.log({account, profile})
            if (account?.type === "oauth" && profile) {
                return await signInWithOauth({ account, profile })
            }
            return true
        },
        
        async session({ session, token }) {
            // console.log({session, token})
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    _id: token._id,
                    role: token.role,
                    provider: token.provider
                }
            }
        }
    }
}