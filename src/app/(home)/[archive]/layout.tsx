
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
            {children}
        </div>
    )
}

export default Layout