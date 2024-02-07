'use client'
import Divider from '@/component/items/divider'
import React from 'react'
import { useRouter } from 'next/navigation'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MessageIcon from '@mui/icons-material/Message';
import FeedIcon from '@mui/icons-material/Feed';
type Props = {}

const ProfileLeft = (props: Props) => {

    const toPage = useRouter()
    const menus = [
        {
            icon: <PersonIcon />,
            name: "thông tin người dùng",
            link: "/home/profile"
        },
        {
            icon: <FeedIcon />,
            name: "bảng tin",
            link: "/home/profile/feed"
        },
        {
            icon: <ShoppingCartIcon />,
            name: "giỏ hàng",
            link: "/home/profile/cart"
        },
        {
            icon: <MessageIcon />,
            name: "thư",
            link: "/home/profile/mesage"
        },
        {
            icon: <ManageAccountsIcon />,
            name: "cài đặt",
            link: "/home/profile/setting"
        },
    ]
    return (
        <div className='profileLeft'>
            <Divider list={menus} func={(l) => toPage.push(l)} />
        </div>
    )
}

export default ProfileLeft