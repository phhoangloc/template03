"use client"
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Input from '@/component/items/input';
import { setMenu } from '@/redux/reducer/MenuReducer';
import { useRouter } from 'next/navigation';
import TextArea from '@/component/items/textarea';
import Button from '@/component/items/button';
import EditItem from '@/component/admin/editItem';
import EditUser from '@/component/admin/editUser';
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    useEffect(() => {
        !currentUser.length && currentUser.position !== "admin" && toPage.push("/admin")
    }, [currentUser])

    const toPage = useRouter()

    return (
        <>
            <div className="right_header">
                {currentMenu ? "" : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
                <AddIcon onClick={() => toPage.push("/admin/" + params.archive + "/new_")} />
            </div>
            {params.archive !== "user" ?
                <EditItem archive={params.archive} slug={params.slug} /> :
                <EditUser archive="user" slug={params.slug} />
            }
        </>
    )
}

export default Page