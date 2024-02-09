"use client"
import React from 'react'
import '../style/style.css'
import { useState } from 'react'
import store from '@/redux/store'
type Props = {
    open?: boolean,
    func?: (e: string) => void,
    list: {
        icon?: React.ReactNode,
        name: string,
        link: string
    }[]
}

const Divider = ({ open, list, func }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    return (
        <div className={`${currentTheme ? "main_light" : "main_dark"} dividers ${open ? "deviders_open" : ""} `}>
            {list.map((item, index) =>
                <div className='divider' key={index} onClick={() => func ? func(item.link) : {}}>{item.icon} <span>{item.name}</span></div>
            )}
        </div>
    )
}

export default Divider