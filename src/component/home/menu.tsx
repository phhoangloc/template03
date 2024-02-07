'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReducer';
import { useRouter } from 'next/navigation';

const Menu = () => {

    const [currentTheme, setCurrentTheme] = useState<{}>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<{}>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    const toPage = useRouter()
    const menus = [
        {
            name: "Về chúng tôi",
            link: "/home/about"
        },
        {
            name: "Đồng hồ",
            link: "/home/watch"
        },
        {
            name: "Liên hệ",
            link: "/home/contact"
        },

    ]

    return (
        <div className={`menu ${currentMenu ? "menu_open" : ""} ${currentTheme ? "main_light" : "main_dark"}`}>
            <CloseIcon onClick={() => store.dispatch(setMenu(false))} />
            <h2>Menu</h2>
            {menus.map((item, index) =>
                <h3 key={index} onClick={() => { toPage.push(item.link), store.dispatch(setMenu(false)) }}>{item.name}</h3>
            )}
        </div>
    )
}

export default Menu