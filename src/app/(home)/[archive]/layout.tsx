
import Header from '@/components/home/header'
import { Menu } from '@/components/home/menu'
import React from 'react'
import Footer from '@/components/home/footer'
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {


    return (
        <div className='bg-amber-100 dark:bg-slate-900 dark:text-white'>
            <Menu />
            <Header />
            <div className=" min-h-screen pt-20">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout