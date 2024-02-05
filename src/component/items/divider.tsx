"use client"
import React from 'react'
import "./style.css"
type Props = {
    open?: boolean,
    func?: (e: string) => void,
    list: {
        name: string,
        link: string
    }[]
}

const Divider = ({ open, list, func }: Props) => {
    return (
        <div className={`dividers ${open ? "deviders_open" : ""}`}>
            {list.map((item, index) =>
                <div className='divider' key={index} onClick={() => func ? func(item.link) : {}}>{item.name}</div>
            )}
        </div>
    )
}

export default Divider