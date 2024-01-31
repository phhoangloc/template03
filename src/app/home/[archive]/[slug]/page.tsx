"use client"
import NotFound from '@/app/not-found'
import Item from '@/component/home/item'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {
    params: {
        archive: string,
        slug: string,
    }
}

const page = ({ params }: Props) => {

    const [item, setItem] = useState<any>()

    const getItem = async (slug: string) => {
        const result = await axios.get(process.env.server_url + "watch?slug=" + slug)
        setItem(result.data.data[0])
    }

    useEffect(() => {
        getItem(params.slug)
    }, [params.slug])


    if (item && item._id && item.genre === params.archive) {
        return (
            <Item item={item} />
        )
    }
    return <NotFound />


}

export default page