'use client'
import { EditDetailbySlug } from '@/components/admin/detail'
import React from 'react'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    return (
        <EditDetailbySlug path1={params.archive} path2={params.slug} />
    )
}

export default Page