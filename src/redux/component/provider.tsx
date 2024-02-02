'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { useRouter } from 'next/navigation'
import { setUser } from '../reducer/UserReduce'
import { setLoading } from '../reducer/LoadingReducer'
import Loading from '@/app/loading'
import axios from 'axios'
import NoticeModal from '@/component/noticeModal'
import { setRefresh } from '../reducer/RefreshReducer'
import AlertModal from '@/component/alertModal'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [number, setCurrentNumber] = useState<number>(store.getState().refresh)

    const update = () => {
        store.subscribe(() => setCurrentNumber(store.getState().refresh))
    }

    update()

    const [loading, setLoading] = useState<boolean>(true)

    const checkLogin = async () => {
        setLoading(true)
        const result = await axios.get(process.env.server_url + "myuser", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        if (result.data.success) {
            setLoading(false)
            store.dispatch(setUser(result.data.data))
        } else {
            setLoading(false)
            store.dispatch(setUser({}))
        }

    }

    useEffect(() => {
        checkLogin()
    }, [number])

    return (
        loading ?
            <Loading /> :
            <div className={`provider`}>
                <NoticeModal />
                <AlertModal />
                {children}
                <button onClick={() => store.dispatch(setRefresh())}></button>
            </div>
    )
}

export default Provider