import NotFound from '@/app/not-found'
import React from 'react'
import ItemRight from './itemRight'

type Props = {
    archive: string
}

const Mainright = ({ archive }: Props) => {


    switch (archive) {
        case "dashboard":
        case "watch":
        case "user":
            return <ItemRight archive={archive} />
        default:
            return <NotFound />
    }
}

export default Mainright