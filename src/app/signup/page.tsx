'use client'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import SignupCard from '@/components/cards/signupCard';
import { useRouter } from 'next/navigation';
import { ApiSignup } from '@/api/client';
type Props = {}

const Login = (props: Props) => {


    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-white relative flex flex-col justify-center'>
            <SignupCard />
        </div>
    )
}

export default Login