'use client'

import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReduce';
type Props = {}

export const menus = [
    {
        name: "ABOUT",
        link: "/about"
    },
    {
        name: "BOOK",
        link: "/book"
    },
    {
        name: "BLOG",
        link: "/blog"

    },
    {
        name: "CONTACT",
        link: "/contact"

    },

]

export const Menu = (props: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [_id, set_id] = useState<number>(-1)

    const toPage = useRouter()
    return (
        <div className={`${currentMenu ? "w-screen" : "w-0"} fixed h-screen transition-all duration-300 delay-200 overflow-hidden bg-white dark:bg-slate-800  z-30 md:hidden`}>
            <CloseIcon className='!w-12 !h-12 p-2  top-0 left-0 cursor-pointer' onClick={() => store.dispatch(setMenu(false))} />
            <div className="grid gap-1 dark:text-white max-w-[275px] ">
                <div className="h-12 p-2 font-bold text-xl flex flex-col justify-center cursor-pointer text-orange-600 dark:text-white">
                    <Link href="/" target='_blank'>LOCAND</Link>
                </div>
                {
                    menus.map((item, index) =>
                        < div key={index}>
                            <div className={`h-12  p-2 flex flex-col justify-center  cursor-pointer opacity-50  ${_id === index ? "font-semibold !opacity-100" : ""} hover:opacity-100`}
                                onClick={(e) => { set_id(index), e.stopPropagation(), item.link ? toPage.push(item.link) : null }}>
                                {item.name}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}