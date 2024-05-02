'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Feeds from '@/component/feeds'
type Props = {
    params: { id: string, type: string }
}

const Page = ({ params }: Props) => {

    return (
        <Feeds id={params.id} type={params.type} rss="" />
    )
}

export default Page