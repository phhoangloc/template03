'use client'
import Login from '@/component/login'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation';

const Page = () => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const toPage = useRouter()


    useEffect(() => {
        currentUser && currentUser.position === "admin" && toPage.push("admin/dashboard")
    }, [currentUser])

    return <Login />

}

export default Page