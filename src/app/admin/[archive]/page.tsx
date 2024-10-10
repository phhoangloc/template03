'use client'
import React, { useState, useEffect } from 'react'
import LoginCard from '@/components/cards/loginCard'
import SignupCard from '@/components/cards/signupCard'
import { Archive, ArchivePic } from '@/components/admin/archive'
import store from '@/redux/store'

type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })
    switch (params.archive) {
        case "blog":
        case "page":
            return (
                <Archive archive={params.archive} />
            )
        // case "user":
        //     return (
        //         currentUser?.position === "admin" ? <Archive archive="user" /> : <EditDetailById path1='user' path2={currentUser?.id} />
        //     )
        case "media":
            return (
                <ArchivePic edit={true} />
            )
        // case "profile":
        //     return (
        //         <EditDetailById path1={"user"} path2={currentUser.id} />
        //     )
        default:
            return (
                <div className='dark:text-white'>
                    NOT FOUND
                </div>
            )
    }

}

export default Page