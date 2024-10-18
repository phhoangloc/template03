import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../button/button'
type Props = {
    home?: string
}

const NotFound = ({ home }: Props) => {
    const toPage = useRouter()
    return (

        <div className="w-11/12 max-w-[400px] bg-white dark:bg-slate-800 m-auto aspect-square flex flex-col justify-center shadow-md text-center">
            <p className='text-2xl font-bold'>404!</p>
            <p className='text-lg'>this page is not found!</p>
            <Button onClick={() => toPage.push(home ? home : "/")} name="home" sx='!w-24' />
        </div>

    )
}

export default NotFound