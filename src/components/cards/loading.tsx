import React, { } from 'react'
type Props = {
    home?: string
}

const Loading = ({ home }: Props) => {

    return (
        <div className="w-11/12 max-w-[400px] m-auto aspect-square flex flex-col justify-center text-center">
            <p className='text-2xl font-bold'>Loading...</p>
        </div>

    )
}

export default Loading