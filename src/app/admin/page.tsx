'use client'
import Login from '@/component/login'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation';
import { setNotice } from '@/redux/reducer/noticeReducer';

const Page = () => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [notice, setCurrentNotice] = useState<any>(store.getState().notice)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentNotice(store.getState().notice))
    }

    update()

    const toPage = useRouter()


    useEffect(() => {
        if (currentUser && currentUser.position === "admin") {
            toPage.push("admin/dashboard")
        } else {
            store.dispatch(setNotice({ success: false, open: true, msg: "bạn không có quyền truy cập trang web này!" }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, open: false, msg: "" }))
            }, 3000);
        }
    }, [currentUser])

    return <Login archive={"admin"} />

}

export default Page