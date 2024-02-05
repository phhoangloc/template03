'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import PersonIcon from '@mui/icons-material/Person';
type Props = {
    menus: { icon: React.ReactNode, name: string, link: string }[]
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
            <div className="admin_menu">
                {menus.map((menu, item) =>
                    <p className={`${archive === menu.name ? "p_plus" : ""}`} key={item} onClick={() => { setArchive(menu.name); toPage.push("/admin" + menu.link) }}>
                        {menu.icon}
                        <span>{menu.name}</span>
                    </p>)}
            </div>
        </div>
    )
}

export default Mainleft