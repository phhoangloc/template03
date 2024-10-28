
import Header from '@/components/home/header'
import { Menu } from '@/components/home/menu'
import React from 'react'
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {


    return (
        <div className='bg-amber-100 dark:bg-slate-900 dark:text-white'>
            <Menu />
            <Header />
            <div className=" min-h-screen pt-16">
                {children}
            </div>
        </div>
    )
}

export default Layout