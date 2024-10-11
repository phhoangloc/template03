import React, { useState } from 'react'

import Input from '@/components/input/input';
import Link from 'next/link';
import Button from '@/components/button/button';
import { ApiLogin } from '@/api/client';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from 'next/navigation';
import store from '@/redux/store';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import { setNotice } from '@/redux/reducer/noticeReducer';
type Props = {
    archive?: string
}

const LoginCard = ({ archive }: Props) => {

    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toPage = useRouter()

    const login = async (data: { username: string, password: string }) => {

        const result = await ApiLogin(data)

        if (result.success) {


            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                localStorage.token = "bearer " + result.result
                store.dispatch(setRefresh())
                toPage.push("/" + archive)
            }, 3000)

        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)
        }
    }
    return (
        <div className='bg-white dark:bg-slate-800 m-auto w-11/12 max-w-[400px] text-center p-10 shadow-md dark:text-white '>
            <div className="row-span-2 h-12 flex flex-col justify-center text-2xl font-bold">
                <h2>Login</h2>
            </div>
            <Input name="Username" onChange={(v) => set_username(v)} value={_username} />
            <Input name="Password" type={showPassword ? 'text' : 'password'} onChange={(v) => set_password(v)} value={_password} icon1={showPassword ? <RemoveRedEyeIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => setShowPassword(false)} /> : <VisibilityOffIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => setShowPassword(true)} />} />
            <div className="h-12 flex flex-col justify-center">
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p className='opacity-50 hover:opacity-100 cursor-pointer hover:text-orange-600 flex w-max m-auto'>Log in by google</p>
            </div>
            <div className="h-12 flex flex-col justify-center   text-slate-500">
                <p>You do not have an account</p>
                <Link className='opacity-75 hover:opacity-100 hover:text-orange-600' href={"signup"}>Sign Up!</Link>
            </div>
            <Button name="Log In" onClick={() => login({ username: _username, password: _password })} sx='!w-full' />

        </div>
    )
}

export default LoginCard