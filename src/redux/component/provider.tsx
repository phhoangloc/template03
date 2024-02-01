'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { useRouter } from 'next/navigation'
import { setUser } from '../reducer/UserReduce'
import { setLoading } from '../reducer/LoadingReducer'
import Loading from '@/app/loading'
import axios from 'axios'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentUpdate(store.getState().update))
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
    }, [currentUpdate])

    return (
        loading ?
            <Loading /> :
            <div className={`provider`}>{children}</div>
    )
}

export default Provider