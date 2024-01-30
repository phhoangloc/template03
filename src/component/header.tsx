'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReducer';
import PersonIcon from '@mui/icons-material/Person';
type Props = {}

const Header = (props: Props) => {
    return (
        <div className='header'>
            <MenuIcon onClick={() => store.dispatch(setMenu(true))} />
            <h1>CLOCK</h1>
            <PersonIcon />
        </div>
    )
}

export default Header