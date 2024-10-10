'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import LoginCard from '@/components/cards/loginCard';
type Props = {}

const Login = (props: Props) => {

    return (
        <div className='min-h-screen bg-amber-50 relative flex flex-col justify-center'>
            <LoginCard />
        </div>
    )
}

export default Login