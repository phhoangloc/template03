'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { ApiCheckLogin } from '@/api/user'
import { setUser } from '../reducer/UserReduce'
import Loading from '@/components/cards/loading'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const update = () => {
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))

    }
    useEffect(() => {
        update()
    })

    const [_loading, set_loading] = useState<boolean>(true)

    const isLogin = async () => {
        set_loading(true)
        try {
            const result = await ApiCheckLogin()
            if (result.success) {
                set_loading(false)
                store.dispatch(setUser(result.data))
            } else {
                set_loading(false)
                store.dispatch(setUser({}))
            }
        } catch (error) {
            set_loading(false)
            store.dispatch(setUser({}))
        }

    }


    useEffect(() => {
        isLogin()
    }, [currentRefresh])

    return (
        _loading ?
            <div className='bg-slate-50 dark:bg-slate-900 dark:text-white w-screen h-screen flex flex-col justify-center'>
                <Loading />
            </div>
            : children
    )
}

export default Provider