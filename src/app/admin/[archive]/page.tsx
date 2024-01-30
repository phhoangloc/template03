"use client"
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReducer';
import Mainright from '@/component/admin/mainright';
import Input from '@/component/items/input';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()
    const [search, setSearch] = useState<string>("")
    const toPage = useRouter()

    useEffect(() => {
        !currentUser.length && currentUser.position !== "admin" && toPage.push("/admin")
    }, [currentUser])

    return (
        <div className={`admin_main_right ${currentMenu ? "" : "admin_main_right_open"}`}>
            <div className="right_header">
                {currentMenu ? "" : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
                <AddIcon onClick={() => toPage.push("/admin/" + params.archive + "/new_")} />
                <Input name={<SearchIcon />} value={search} onChange={v => setSearch(v)} />
            </div>
            <Mainright archive={params.archive} />
        </div>
    )
}

export default Page