'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import LoginCard from '@/components/cards/loginCard';
type Props = {}

const Login = (props: Props) => {

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-white relative flex flex-col justify-center'>
            <LoginCard archive='admin' />
        </div>
    )
}

export default Login