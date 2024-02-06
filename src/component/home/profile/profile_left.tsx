'use client'
import Divider from '@/component/items/divider'
import React from 'react'
import { useRouter } from 'next/navigation'
type Props = {}

const ProfileLeft = (props: Props) => {

    const toPage = useRouter()
    const menus = [

        {
            name: "giỏ hàng",
            link: "/home/profile/cart"
        },
        {
            name: "thông tin người dùng",
            link: "/home/profile/"
        },
        {
            name: "cài đặt",
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