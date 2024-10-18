'use client'
import React, { useState, useEffect } from 'react'
import LoginCard from '@/components/cards/loginCard'
import SignupCard from '@/components/cards/signupCard'
import { Archive, ArchivePic } from '@/components/admin/archive'
import store from '@/redux/store'
import SendMailCard from '@/components/cards/sendMailCard'
import NotFound from '@/components/cards/notFound'
import { EditDetailbyId } from '@/components/admin/detail'

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
        case "login":
            return (
                <div className='h-full-12 relative flex flex-col justify-center'>
                    <LoginCard archive='admin' />
                </div>
            )
        case "sendmail":
            return (
                <div className='h-full-12 relative flex flex-col justify-center'>
                    <SendMailCard />
                </div>
            )
        case "signup":
            return (
                <div className='h-full-12 relative flex flex-col justify-center'>
                    <SignupCard />
                </div>
            )
        case "blog":
        case "book":
        case "page":
            return (<Archive archive={params.archive} />)
        case "user":
            return (
                currentUser.position !== "admin" ?
                    <div className="w-full h-full-12 flex flex-col justify-center">
                        <NotFound home="/admin" />
                    </div>
                    :
                    <Archive archive="user" />
            )
        case "media":
            return (
                <ArchivePic edit={true} />
            )
        case "profile":
            return (
                <EditDetailbyId id={currentUser.id} />
            )
        default:
            return (
                <div className="w-full h-full flex flex-row justify-center">
                    <NotFound home="/admin" />
                </div>
            )
    }

}

export default Page