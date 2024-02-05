"use client"
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { setMenu } from '@/redux/reducer/MenuReducer';
import { useRouter } from 'next/navigation'
import EditItem from '@/component/admin/editItem';
import EditUser from '@/component/admin/editUser';
import CloseIcon from '@mui/icons-material/Close';
import NotFound from '@/app/not-found';
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

    switch (params.archive) {
        case "watch":
            return <EditItem archive={params.archive} slug={params.slug} />
        case "user":
            return <EditUser archive="user" slug={params.slug} />

    }

    return <NotFound />
}

export default Page