'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { useRouter } from 'next/navigation'
import { setUser } from '../reducer/UserReduce'
import { setLoading } from '../reducer/LoadingReducer'
import Loading from '@/app/loading'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const [loading, setLoading] = useState<boolean>(true)

    const checkLogin = async () => {
        setLoading(true)
        await fetch(process.env.server_url + "myuser", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                if (data.success) {
                    store.dispatch(setUser(data.data))
                } else {
                    store.dispatch(setUser({}))
                }
            })
    }

    useEffect(() => {
        checkLogin()
    }, [currentUpdate])

    return (
        loading ?
            <Loading /> :
            <div className={`provider ${currentTheme ? "light" : "dark"}`}>{children}</div>
    )
}

export default Provider