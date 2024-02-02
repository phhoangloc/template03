import React, { useState } from 'react'
import Input from './items/input'
import Button from './items/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import { setRefresh } from '@/redux/reducer/RefreshReducer'
import { setNotice } from '@/redux/reducer/noticeReducer'
type Props = {
    archive: string
}
const Login = ({ archive }: Props) => {

    const toPage = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (body: { username: string, password: string }) => {

        const result = await axios.post(process.env.server_url + "login", body)
        if (result.data.success) {
            localStorage.token = "Bearer " + result.data.data.token
            setUsername("")
            setPassword("")
            toPage.push("/" + archive)
            store.dispatch(setRefresh())
            store.dispatch(setNotice({ success: result.data.success, open: true, msg: result.data.message }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.data.success, open: false, msg: "" }))
            }, 3000)
        } else {
            store.dispatch(setNotice({ success: result.data.success, open: true, msg: result.data.message }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.data.success, open: false, msg: "" }))
            }, 3000)
        }
    }
    return (
        <div className='login center'>
            <h3>Login</h3>
            <Input name='username' value={username} onChange={(data) => setUsername(data)} />
            <Input type='password' name='password' value={password} onChange={(data) => setPassword(data)} />
            <Button onClick={() => login({ username, password })} name="Log in" />
            <p className="link" onClick={() => toPage.push("/home/signup")}>sign up</p>
        </div>
    )
}

export default Login