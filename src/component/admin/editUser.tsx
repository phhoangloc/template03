'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import store from '@/redux/store';
import { setNotice } from '@/redux/reducer/noticeReducer';
import UploadPicture from '../assets/uploadPicture';
import Button from '../items/button';
import Input from '../items/input';
import Select from '../items/select';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
type Props = {
    archive: string,
    slug: string
}

const EditUser = ({ archive, slug }: Props) => {

    const [i, setI] = useState<number>(0)
    const refresh = () => {
        setI(prev => prev + 1)
    }
    const [currentslug, setCurrentSlug] = useState<string>("")

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

    const getItem = async (slug: string) => {
        if (slug !== "new_") {
            const result = await axios.get(process.env.server_url + "admin/" + archive + "?id=" + slug, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })

            if (result.data.success) {
                setCurrentSlug(result.data.data[0].slug)
                setUsername(result.data.data[0].username)
                setPassword(result.data.data[0].password)
                setPosition(result.data.data[0].position)
                setEmail(result.data.data[0].email)
                setBackground(result.data.data[0].infor.background)
                setAvata(result.data.data[0].infor.avata)
                setFullname(result.data.data[0].infor.fullname)
                setPhone(result.data.data[0].infor.phone)
                setAddress(result.data.data[0].infor.address)
                setActive(result.data.data[0].active)
            }
        }
    }

    useEffect(() => {
        getItem(slug)
    }, [slug, i])

    const save = async () => {

        const body = {
            username,
            position,
            email,
            password,
            active,
            infor: {
                background,
                avata,
                fullname,
                address,
                phone
            }
        }
        const result = await axios.put(process.env.server_url + `admin/${archive}?id=${slug}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        store.dispatch(setNotice({ success: result.data.success, open: true, msg: result.data.msg }))
        setTimeout(() => {
            store.dispatch(setNotice({ success: result.data.success, open: false, msg: "" }))
        }, 3000)

        refresh()
    }

    return (
        <div className="edit_item">
            <div className='cover'>
                <UploadPicture src={background.length ? process.env.google_url + background[background.length - 1].name : undefined} updatePicture={(e) => setBackground(prev => [...prev, { name: e }])} />
            </div>
            <div className="usernameandavata">
                <div className="avata">
                    <UploadPicture src={avata.length ? process.env.google_url + avata[avata.length - 1].name : undefined} updatePicture={(e) => setAvata(prev => [...prev, { name: e }])} />
                </div>
                <div className="title">{username}<br></br><span>{position}</span></div>
            </div>
            <div className="infomation grid_box">
                <div className="xs12 sm6">
                    <Input name="username" value={username} onChange={(e) => setUsername(e)} />
                </div>
                <div className="xs12 sm6">
                    <Select name="position" options={["user", "admin"]} onChange={(e) => setPosition(e)} />
                </div>
                <div className="xs12 sm6">
                    <Input name="email" value={email} onChange={(e) => setEmail(e)} />
                </div>
                <div className="xs12 sm6">
                    <Input type='password' name="new password" value={password} onChange={(e) => setPassword(e)} />
                </div>
                <div className="xs12 sm6">
                    <Input name="fullname" value={fullname} onChange={(e) => setFullname(e)} />
                </div>
                <div className="xs12 sm6">
                    <Input name="address" value={address} onChange={(e) => setAddress(e)} />
                </div>
                <div className="xs12 sm6">
                    <Input name="phone" value={phone} onChange={(e) => setPhone(e)} />
                </div>
                <div className="xs12 sm6 ">
                    <p className='active'>active: {active ? <CheckBoxIcon onClick={() => setActive(!active)} /> : <CheckBoxOutlineBlankIcon onClick={() => setActive(!active)} />}</p>
                </div>

            </div>
            <Button name='save' onClick={() => save()} />
        </div>
    )
}

export default EditUser