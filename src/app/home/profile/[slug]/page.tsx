import NotFound from '@/app/not-found'
import Feed from '@/component/home/profile/pages/feed'
import React from 'react'

type Props = {
    params: { slug: string }
}

const page = ({ params }: Props) => {
    switch (params.slug) {
        case "feed":
            return <Feed />
    }
    return <NotFound />
}

export default page