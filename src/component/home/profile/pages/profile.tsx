import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import axios from 'axios'
import UploadPicture from '@/component/assets/uploadPicture'
import Image from 'next/image'
import Table from '@/component/assets/table'
type Props = {}

const Profile = (props: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [fullname, setFullname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)
    const [intro, setIntro] = useState<string>("")

    const [background, setBackground] = useState<{ name: string }[]>([])
    const [avata, setAvata] = useState<{ name: string }[]>([])

    const getItem = async () => {
        const result = await axios.get(process.env.server_url + "myuser/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        console.log(result)
        if (result.data.success) {
            setUsername(result.data.data.username)
            setPosition(result.data.data.position)
            setEmail(result.data.data.email)
            setBackground(result.data.data.infor.background)
            setAvata(result.data.data.infor.avata)
            setFullname(result.data.data.infor.fullname)
            setPhone(result.data.data.infor.phone)
            setAddress(result.data.data.infor.address)
            setActive(result.data.data.active)
            setIntro(result.data.data.intro)
        }
    }

    useEffect(() => {
        getItem()
    }, [])

    const dataInTable = {
        username,
        email,
        position,
        fullname,
        address,
        phone,
        active,
    }

    return (
        <div className='myinfo'>
            <div className={`profile_user ${currentTheme ? "main_light" : "main_dark"}`}>
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
            <div className={`information ${currentTheme ? "main_light" : "main_dark"}`}>
                <div className="intro">
                    <div className="info_header">Intro</div>
                    <div className="info_content" dangerouslySetInnerHTML={{ __html: intro }}></div>
                </div>
                <div className="myimage">
                    <div className="info_header">Picture</div>
                    <div className="info_content">
                        <div className="infor_cover">
                            <h4>cover</h4>
                            <div className="picture_box grid_box">
                                {background && background.map((item, index) =>
                                    <div className='pic xs6 sm4 ' key={index}>
                                        <Image src={process.env.google_url + item.name} width={200} height={200} alt='cover' />
                                    </div>)}
                            </div>
                        </div>
                        <div className="infor_cover">
                            <h4>avata</h4>
                            <div className="picture_box grid_box">
                                {avata && avata.map((item, index) =>
                                    <div className='pic xs6 sm4 ' key={index}>
                                        <Image src={process.env.google_url + item.name} width={200} height={200} alt='cover' />
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myinfo">
                    <div className="info_header">Personal Information</div>
                    <div className="info_content"><Table datas={Object.entries(dataInTable)} /></div>
                </div>
            </div>
        </div>
    )
}

export default Profile