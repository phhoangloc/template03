'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReducer';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
type Props = {}

const Header = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    return (
        <div className='header'>
            <MenuIcon onClick={() => store.dispatch(setMenu(true))} />
            <h1><Link href={"/home"}>Locand</Link></h1>
        </div>
    )
}

export default Header