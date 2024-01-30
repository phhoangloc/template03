'use client'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='admin_header'>
            <p>Admin</p>
            <div className='icon'>
                <PersonIcon />
            </div>
        </div>
    )
}

export default Header