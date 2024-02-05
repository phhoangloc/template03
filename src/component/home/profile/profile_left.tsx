'use client'
import Divider from '@/component/items/divider'
import React from 'react'
import { useRouter } from 'next/navigation'
type Props = {}

const ProfileLeft = (props: Props) => {

    const toPage = useRouter()
    const menus = [
        {
            name: "profile",
            link: "/home/profile/"
        },
        {
            name: "cart",
            link: "/home/profile/cart"
        },
        {
            name: "setting",
            link: "/home/profile/setting"
        },
    ]
    return (
        <div className='profileLeft xs3'>
            <Divider list={menus} func={(l) => toPage.push(l)} />
        </div>
    )
}

export default ProfileLeft