"use server"

import { getServerSession } from "next-auth/next"
import { Account, Profile } from "next-auth"
import { nextauthOptions } from "@/lib/nextauth-options"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/user.model"

export async function getUserSession() {
    const session = await getServerSession(nextauthOptions)
    return ({ session })
}

interface ExtendedProfile extends Profile {
    picture?: string
}

interface SignInWithOauthParams {
    account: Account,
    profile: ExtendedProfile
}

export async function signInWithOauth({
    account,
    profile
}: SignInWithOauthParams) {
    // console.log({account, profile})
    connectDB()

    const user = await User.findOne({ email: profile.email })

    if (user) return true

    const newUser = new User({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        provider: account.provider
    })

    // console.log(newUser)
    await newUser.save()

    return true
}

