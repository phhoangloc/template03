'use client'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReducer';
const Header = () => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(false)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }
    useEffect(() => {
        update()
    }, [])
    return (
        <div className='admin_header'>
            {currentMenu ? <CloseIcon onClick={() => { store.dispatch(setMenu(false)) }} /> : <MenuIcon onClick={() => { store.dispatch(setMenu(true)) }} />}
            <p>ADMIN</p>
            <div className='icon'>
                <PersonIcon />
            </div>
        </div>
    )
}

export default Header