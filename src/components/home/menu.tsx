'use client'

import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReduce';
import Image from 'next/image'
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

    const toPage = useRouter()
    return (
        <div className={`${currentMenu ? "w-screen" : "w-0"} fixed h-screen transition-all duration-300 delay-200 overflow-hidden bg-amber-50 dark:bg-slate-800  z-30 md:hidden`}>
            <div className="p-4">
                <div className="h-12 flex">
                    <CloseIcon className='!w-12 !h-12 p-2  top-0 left-0 cursor-pointer' onClick={() => store.dispatch(setMenu(false))} />
                    <div className='flex text-4xl h-full font-bold leading-[48px]'>L<Image src="/image/robusta.png" width={20} height={20} className='w-auto h-4/5 my-auto mx-1' alt='bean' />CAND</div>
                </div>
            </div>
            <div className="grid gap-1 dark:text-white p-4">
                {
                    menus.map((item, index) =>
                        <div key={index} className={`  p-2 flex flex-col justify-center  cursor-pointer text-xl`}
                            onClick={() => {
                                store.dispatch(setMenu(false));
                                setTimeout(() => {
                                    item.link ? toPage.push(item.link) : null
                                }, 500);
                            }}>
                            {item.name}
                        </div>

                    )
                }
            </div>
        </div>

    )
}