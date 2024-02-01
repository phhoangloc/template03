'use client'
import NotFound from '@/app/not-found'
import Page from '@/component/home/page'
import React from 'react'

import Login from '@/component/login'
import Signup from '@/component/signup'
import Archive from '@/component/home/archive'
import About from '@/component/home/about'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    switch (params.archive) {
        case "about":
            return <About />
        case "watch":
            return <Archive />
        case "login":
            return <Login />
        case "signup":
            return <Signup />
    }
    return (
        <NotFound />
    )
}

export default page