'use client'
import { EditDetailbySlug, EditDetailbyId } from '@/components/admin/detail'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import NotFound from '@/components/cards/notFound'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    if (params.archive === "user" && currentUser.position === "user") {
        return (
            <div className="w-full h-full-12 flex flex-col justify-center">
                <NotFound home="/admin" />
            </div>
        )
    }

    if (params.archive === "user" && currentUser.position === "admin") {
        return (<EditDetailbyId id={params.slug} />)
    }

    return (<EditDetailbySlug path1={params.archive} path2={params.slug} />)
}

export default Page