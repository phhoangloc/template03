'use client'
import React from 'react'
import store from '@/redux/store'
import { setMenu } from '@/redux/reducer/MenuReduce'
import MenuIcon from '@mui/icons-material/Menu';
import SendMailCard from '@/components/cards/sendMailCard';
setMenu
type Props = {}

const Page = (props: Props) => {
    return (
        <div className='min-h-full relative flex flex-col justify-center'>
            <SendMailCard />
        </div>
    )
}

export default Page