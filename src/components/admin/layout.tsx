'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { setMenu } from '@/redux/reducer/MenuReduce'
import { Menu } from './menu'
import LoginCard from '../cards/loginCard'
import Header from './header'
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {


    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))

    }

    useEffect(() => {
        update()
    })

    return (
        currentUser.id ?
            <div className='bg-amber-50 dark:bg-slate-900 text-slate-800 dark:text-white'>
                <div className="flex min-h-screen gap-4 p-2">
                    <div className={`fixed top-0 left-0 h-full ${currentMenu ? "w-screen" : "w-0 opacity-0 transition-all duration-300 delay-500"} backdrop-brightness-75 lg:w-1/6 lg:relative lg: lg:opacity-100 lg:backdrop-brightness-100 lg:h-auto  overflow-hidden z-10 shadow-lg `} onClick={() => store.dispatch(setMenu(false))}>
                        <Menu />
                    </div>
                    <div className='w-full col-span-12 lg:w-5/6 relative pt-12'>
                        <Header />
                        {children}
                    </div>
                </div>
            </div> :
            <div className='min-h-screen flex flex-col justify-center bg-amber-50 dark:bg-slate-900'>
                <LoginCard archive='admin' />
            </div>
    )
}

export default Layout