import React, { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { useParams } from 'next/navigation';
import { IconDrop } from '../input/select';
import { useRouter } from 'next/navigation';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import Image from 'next/image';
type Props = {

}

const Header = ({ }: Props) => {

    const params = useParams()
    const toPage = useRouter()

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const dropDataLogin = [
        {
            title: "Profile",
            func: () => toPage.push("/admin/profile")
        },
        {
            title: "Log Out",
            func: () => { localStorage.clear(), store.dispatch(setRefresh()) }
        }]
    const dropDataLogout = [
        {
            title: "Login",
            func: () => toPage.push("/admin/login")
        },
        {
            title: "Sign Up",
            func: () => toPage.push("/admin/signup")
        }
    ]
    return (
        <div className="h-12 flex justify-between dark:text-white absolute w-full top-0">
            <MenuIcon className="cursor-pointer !w-12 !h-12 p-2 text-orange-600 dark:text-white opacity-75 hover:opacity-100 lg:!hidden" onClick={() => store.dispatch(setMenu(true))} />
            <div className="h-full flex flex-col justify-center">
                {params.archive ? params.archive.toString().toUpperCase() : "DASHBOARD"}
            </div>
            <div className='flex'>
                <NotificationsIcon className="cursor-pointer !w-12 !h-12 p-2  text-orange-600 dark:text-white opacity-75 hover:opacity-100" />
                <IconDrop
                    icon={currentUser?.avata ? <Image src={process.env.ftp_url + currentUser.avata.name} fill className='object-cover cursor-pointer' alt='avata' /> : <PersonIcon className="cursor-pointer !w-full !h-full  text-orange-600 dark:text-white opacity-75 hover:opacity-100" />}
                    data={
                        dropDataLogin
                    }
                />
            </div>
        </div>
    )
}

export default Header