'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReducer';

const Menu = () => {

    const [currentMenu, setCurrentMenu] = useState<{}>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    return (
        <div className={`menu ${currentMenu ? "menu_open" : ""}`}>
            <CloseIcon onClick={() => store.dispatch(setMenu(false))} />
            <h2>Menu</h2>
            <p>Watch</p>
            <p>Perfume</p>
        </div>
    )
}

export default Menu