"use client"
import React from 'react'
import '../style/style.css'
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
    return (
        <div className={`dividers ${open ? "deviders_open" : ""}`}>
            {list.map((item, index) =>
                <div className='divider' key={index} onClick={() => func ? func(item.link) : {}}>{item.icon} <span>{item.name}</span></div>
            )}
        </div>
    )
}

export default Divider