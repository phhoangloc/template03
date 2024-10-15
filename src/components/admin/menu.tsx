import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
type Props = {}

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
    const menus = [
        {
            name: "DASHBOARD",
            link: "/admin"
        },
        {
            name: "BOOK",
            children: [
                {
                    name: "VIEW BOOK",
                    link: "/admin/book"
                },
                {
                    name: "ADD NEW BOOK",
                    link: "/admin/book/news"
                },
            ]
        },
        {
            name: "BLOG",
            position: "user",
            children: [
                {
                    name: "VIEW BLOG",
                    link: "/admin/blog"
                },
                {
                    name: "ADD NEW BLOG",
                    link: "/admin/blog/news"
                },
            ]
        },
        {
            name: "IMAGES",
            link: "/admin/media"
        },
        {
            name: "AUTHENTICATION",
            children: [
                {
                    name: "LOGIN",
                    link: "/admin/login"
                },
                {
                    name: "SIGN UP",
                    link: "/admin/signup"
                },
                {
                    name: "SEND EMAIL ",
                    link: "/admin/sendmail"
                },
            ]
        },
        {
            name: "USER",
            position: "user",
            children: [
                {
                    name: "VIEW USER",
                    link: "/admin/user"
                },
            ]
        },
    ]
    const toPage = useRouter()
    return (
        <div className={`${currentMenu ? "w-5/6" : "w-0"} h-full max-w-[275px] transition-all duration-300 delay-200  lg:w-full lg:max-w-full lg:rounded overflow-hidden bg-white dark:bg-slate-800`}>
            <div className="grid gap-1 dark:text-white">
                <div className="h-12 p-2 font-bold text-xl flex flex-col justify-center cursor-pointer text-orange-600 dark:text-white">
                    LOCAND
                </div>
                {
                    menus.map((item, index) =>
                        currentUser.position === item.position ? null : < div key={index}>
                            <div className={`h-12  p-2 flex flex-col justify-center  cursor-pointer opacity-50  ${_id === index ? "font-semibold !opacity-100" : ""} hover:opacity-100`}
                                onClick={(e) => { set_id(index), e.stopPropagation(), item.link ? toPage.push(item.link) : null }}>
                                {item.name}
                            </div>
                            <div className={`grid overflow-hidden transition-all duration-300 `} style={{ height: item.children?.length && index === _id ? item.children?.length * 48 + "px" : "0" }}>
                                {
                                    item.children ? item.children.map((child, indexchild) =>
                                        <div key={indexchild} className={`h-12  p-3 flex flex-col justify-center  cursor-pointer opacity-25 hover:opacity-100 truncate text-xs`}
                                            onClick={(e) => { set_id(index), e.stopPropagation(), child.link ? toPage.push(child.link) : null }}>
                                            {child.name}
                                        </div>) : null
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}
