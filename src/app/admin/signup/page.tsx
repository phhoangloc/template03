'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import SignupCard from '@/components/cards/signupCard';
type Props = {}

const Login = (props: Props) => {

    return (
        <div className='min-h-full relative flex flex-col justify-center'>
            <MenuIcon className="absolute top-0 left-0 z-9 cursor-pointer !w-12 !h-12 p-2 text-orange-600 dark:text-white opacity-75 hover:opacity-100 lg:!hidden" onClick={() => store.dispatch(setMenu(true))} />
            <SignupCard />
        </div>
    )
}

export default Login