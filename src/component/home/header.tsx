'use client'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReducer';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import Divider from '../items/divider';
import { useRouter } from 'next/navigation';
import { setAlert } from '@/redux/reducer/alertReducer';
import { setRefresh } from '@/redux/reducer/RefreshReducer';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Image from 'next/image';
import { setTheme } from '@/redux/reducer/ThemeReduce';

type Props = {}

const Header = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [alert, setCurrentAlert] = useState<any>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const isntLoginList = [
        {
            name: "log in",
            link: "home/login"
        },
        {
            name: "sign up",
            link: "home/signup"
        },
    ]
    const isLoginList = [
        {
            name: "profile",
            link: "home/profile"
        },
        {
            name: "sign out",
            link: "function"
        },
    ]

    const [accBox, setAccBox] = useState<boolean>(false)

    const toPage = useRouter()

    const doFunction = (link: string) => {
        if (link === "function") {
            store.dispatch(setAlert({ value: false, open: true, msg: "do you want to log out" }))
            setAccBox(!accBox)
        } else {
            toPage.push("/" + link)
            setAccBox(!accBox)
        }
    }

    useEffect(() => {
        if (alert.value) {
            localStorage.clear()
            store.dispatch(setAlert({ value: false, open: false, msg: "" }))
            store.dispatch(setRefresh())
        }
    }, [alert.value])

    return (
        <div className='header'>
            <MenuIcon onClick={() => store.dispatch(setMenu(true))} />
            <h1><Link href={"/home"}>Locand</Link></h1>
            {currentUser && currentUser._id ?
                <><Image src={process.env.google_url + currentUser?.infor?.avata[currentUser?.infor?.avata?.length - 1].name} width={30} height={30} alt='pic' priority={true} onClick={() => setAccBox(!accBox)} /><Divider list={isLoginList} func={(l) => doFunction(l)} open={accBox} /></> :
                <><PersonIcon onClick={() => setAccBox(!accBox)} /><Divider list={isntLoginList} func={(l) => doFunction(l)} open={accBox} /></>
            }
            <ShoppingCartIcon />
            {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
        </div>
    )
}

export default Header