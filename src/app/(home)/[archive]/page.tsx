'use client'
import React, { useState, useEffect } from 'react'
import { ApiItem } from '@/api/client'
import NotFound from '@/components/cards/notFound'
import Loading from '@/components/cards/loading'
import ArchiveItem from '@/components/home/archive'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    const [data, setData] = useState<any[]>([])
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    const getContent = async () => {
        setLoading(true)
        const result = await ApiItem({ archive: "page", slug: params.archive })
        if (result.success && result.data[0]) {
            setContent(result.data[0].content)
            setLoading(false)
        } else {
            const result = await ApiItem({ archive: params.archive })
            if (result.success && result.data) {
                setData(result.data)
                setLoading(false)
            } else {
                setLoading(false)
                setContent("")
                setData([])
            }
        }
    }
    useEffect(() => {
        getContent()
    }, [])

    console.log(data)
    console.log(content)
    if (content) {
        return (
            loading ? <Loading /> :
                <div className="w-full dangerous_box" dangerouslySetInnerHTML={{ __html: content }}>
                </div>
        )
    }
    if (data.length) {
        return (
            loading ? <Loading /> : <ArchiveItem data={data} archive={params.archive} />
        )
    }
    return (
        <div className='min-h-screen flex flex-col justify-center'>
            <NotFound />
        </div>
    )
}

export default page