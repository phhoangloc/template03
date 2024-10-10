import React from 'react'
import Input from '@/components/input/input';
import Link from 'next/link';
import Button from '@/components/button/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApiSignup } from '@/api/client';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import store from '@/redux/store';

import { setNotice } from '@/redux/reducer/noticeReducer';
type Props = {}

const SignupCard = (props: Props) => {

    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")
    const [_email, set_email] = useState<string>("")

    const toPage = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})

    useEffect(() => {
        validateForm && validateForm();
    }, [_username, _password, _email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (_username.length != 0 && 6 > _username.length) {
            errors.username = `usernname must be longer than 6 character`
        }
        if (_username) {
            const isusername = await fetch(process.env.api_url + "api/checkuser?username=" + _username)
                .then((res) => res.json())
                .then((data) => data)
            if (isusername) { errors.username = "username is Exited" }
        }
        if (!/\S+@\S+\.\S+/.test(_email) && _email.length != 0) {
            errors.email = 'this email is not valid';
        }
        if (_email) {
            const isEmail = await fetch(process.env.api_url + "api/checkuser?email=" + _email)
                .then((res) => res.json())
                .then((data) => data)
            if (isEmail) { errors.email = "email is existed" }
        }
        if (_password.length != 0 && _password.length < 6) {
            errors.password = `password must be longer than 6 character`;
        }

        setIsErrors(Object.keys(errors).length || _username === "" || _password === "" || _email === "" ? true : false);
        setErrors(errors)
    }
    const signup = async (body: { username: string, password: string, email: string }) => {
        // setLoading(true)
        const result = await ApiSignup(body)
        if (result.success) {
            set_username("")
            set_password("")
            set_email("")
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                toPage.push("login")
            }, 3000)
        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                setLoading(false)
            }, 3000)
        }
    }

    return (
        <div className='bg-white dark:bg-slate-800 m-auto w-11/12 max-w-[440px] text-center p-10 shadow-md '>
            <div className="row-span-2 h-12 flex flex-col justify-center text-2xl font-bold">
                <h2>Sign Up</h2>
            </div>
            <Input name="Username" onChange={(v) => set_username(v)} value={_username} warn={Error.username} />
            <Input name="Password" type={showPassword ? 'text' : 'password'} onChange={(v) => set_password(v)} value={_password} icon1={showPassword ? <RemoveRedEyeIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => setShowPassword(false)} /> : <VisibilityOffIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => setShowPassword(true)} />} />
            <Input name="Email" onChange={(v) => set_email(v)} value={_email} warn={Error.email} />
            <div className="h-12 flex flex-col justify-center">
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p className='opacity-50 hover:opacity-100 cursor-pointer hover:text-orange-600 flex w-max m-auto'>Log in by google</p>
            </div>
            <div className="h-12 flex flex-col justify-center   text-slate-500">
                <p>Go back to Log In</p>
                <Link className='opacity-75 hover:opacity-100 hover:text-orange-600' href={"login"}>Log In!</Link>
            </div>
            <Button name="Sign Up" disable={isError} onClick={() => signup({ username: _username, password: _password, email: _email })} sx='!w-full' />

        </div>
    )
}

export default SignupCard