import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { useParams } from 'next/navigation';

type Props = {

}

const Header = ({ }: Props) => {

    const params = useParams()

    return (
        <div className="h-12 flex justify-between dark:text-white absolute w-full top-0">
            <MenuIcon className="cursor-pointer !w-12 !h-12 p-2 text-orange-600 dark:text-white opacity-75 hover:opacity-100 lg:!hidden" onClick={() => store.dispatch(setMenu(true))} />
            <div className="h-full flex flex-col justify-center">
                {params.archive ? params.archive.toString().toUpperCase() : "DASHBOARD"}
            </div>
            <div>
                <NotificationsIcon className="cursor-pointer !w-12 !h-12 p-2  text-orange-600 dark:text-white opacity-75 hover:opacity-100" />
                <PersonIcon className="cursor-pointer !w-12 !h-12 p-2  text-orange-600 dark:text-white opacity-75 hover:opacity-100" />
            </div>
        </div>
    )
}

export default Header