'use client'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReducer';
import Image from 'next/image';
import { Select } from '@mui/material';
import Divider from '../items/divider';
import Link from 'next/link';
const Header = () => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])

    return (
        <div className='admin_header'>
            {currentMenu ? <CloseIcon onClick={() => { store.dispatch(setMenu(false)) }} /> : <MenuIcon onClick={() => { store.dispatch(setMenu(true)) }} />}
            <p>ADMIN / <span><Link href="/" >HOME</Link></span></p>
            <div className='icon'>
                {currentUser?.infor?.avata ? <Image src={process.env.google_url + currentUser?.infor?.avata[currentUser?.infor?.avata.length - 1].name} width={30} height={30} alt='avta' priority={true} /> : <PersonIcon />}
            </div>
        </div>
    )
}

export default Header