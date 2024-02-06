'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import UploadPicture from '@/component/assets/uploadPicture'
const page = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [fullname, setFullname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)

    const toPage = useRouter()
    const [background, setBackground] = useState<{ name: string }[]>([])
    const [avata, setAvata] = useState<{ name: string }[]>([])

    const getItem = async () => {
        const result = await axios.get(process.env.server_url + "myuser/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        if (result.data.success) {
            // setCurrentSlug(result.data.data[0].slug)
            setUsername(result.data.data.username)
            setPassword(result.data.data.password)
            setPosition(result.data.data.position)
            setEmail(result.data.data.email)
            setBackground(result.data.data.infor.background)
            setAvata(result.data.data.infor.avata)
            setFullname(result.data.data.infor.fullname)
            setPhone(result.data.data.infor.phone)
            setAddress(result.data.data.infor.address)
            setActive(result.data.data.active)
        }
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        <div className='item'>
            <div className='cover'>
                <UploadPicture src={background.length ? process.env.google_url + background[background.length - 1].name : undefined} updatePicture={(e) => setBackground(prev => [...prev, { name: e }])} />
            </div>
            <div className="usernameandavata">
                <div className="avata">
                    <UploadPicture src={avata.length ? process.env.google_url + avata[avata.length - 1].name : undefined} updatePicture={(e) => setAvata(prev => [...prev, { name: e }])} />
                </div>
                <div className="title">{username}<br></br><span>{position}</span></div>
            </div>
        </div>
    )
}

export default page