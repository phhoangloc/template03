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
import ItemRight from '@/component/admin/itemRight';
import NotFound from '@/app/not-found';

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

    switch (params.archive) {
        case "dashboard":
            return (
                <>
                    <h1>DASHBOARD</h1>
                </>
            )
        case "watch":
        case "user":
            return (
                <>
                    <h1>{params.archive.toLocaleUpperCase()}</h1>
                    <div className="right_header">
                        <AddIcon onClick={() => toPage.push("/admin/" + params.archive + "/new_")} />
                        <Input name={<SearchIcon />} value={search} onChange={v => setSearch(v)} />
                    </div>
                    <ItemRight archive={params.archive} />
                </>
            )
        default:
            return <NotFound />
    }
}

export default Page