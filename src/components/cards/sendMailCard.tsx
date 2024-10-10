import React from 'react'
import Input from '@/components/input/input';
import Link from 'next/link';
import Button from '@/components/button/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApiSignup } from '@/api/client';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
type Props = {}

const SendMailCard = (props: Props) => {
    const [_email, set_email] = useState<string>("")

    const toPage = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})

    useEffect(() => {
        validateForm && validateForm();
    }, [_email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (!/\S+@\S+\.\S+/.test(_email) && _email.length != 0) {
            errors.email = 'this email is not valid';
        }
        if (_email) {
            const isEmail = await fetch(process.env.api_url + "api/checkuser?email=" + _email)
                .then((res) => res.json())
                .then((data) => data)
            if (isEmail) { errors.email = "email is existed" }
        }

        setIsErrors(Object.keys(errors).length || _email === "" ? true : false);
        setErrors(errors)
    }
    const sendMail = async (body: { email: string }) => {
        console.log(body)
    }

    return (
        <div className='bg-white dark:bg-slate-800 m-auto w-11/12 max-w-[440px] text-center p-10 shadow-md '>
            <div className="row-span-2 h-12 flex flex-col justify-center text-2xl font-bold">
                <h2>Sign Up</h2>
            </div>
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
            <Button name="Request" disable={isError} onClick={() => sendMail({ email: _email })} sx='!w-full' />

        </div>
    )
}

export default SendMailCard