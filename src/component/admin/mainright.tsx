'use client'

import React, { useState } from 'react'
import store from '@/redux/store'
type Props = {
    children: React.ReactNode
}

const Mainright = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    return (
        <div className={`admin_main_right ${currentMenu ? "" : "admin_main_right_open"}`}>
            {children}
        </div>
    )

}

export default Mainright