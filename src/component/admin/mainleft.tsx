'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import store from '@/redux/store'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation'
import { setMenu } from '@/redux/reducer/MenuReducer';

type Props = {
    menus: { name: string, link: string }[]
}

const Mainleft = ({ menus }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    const pathname = window.location.pathname.split("/")[2]

    const toPage = useRouter()
    const [archive, setArchive] = useState<string>(pathname)


    return (
        <div className={`admin_main_left ${currentMenu ? "open_width_menu" : ""}`}>
            {currentMenu ? <CloseIcon onClick={() => store.dispatch(setMenu(false))} /> : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
            <div className="profile">
                <h2 className="username">{currentUser.username}</h2>
            </div>
            <div className="admin_menu">
                {menus.map((menu, item) =>
                    <p className={`${archive === menu.name ? "p_plus" : ""}`} key={item} onClick={() => { setArchive(menu.name); toPage.push("/admin" + menu.link) }}>{menu.name}</p>)}
            </div>
        </div>
    )
}

export default Mainleft