'use client'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    list: {
        file: string
    }[]
}

const Cover = ({ list }: Props) => {

    const videoRef = useRef<any>()

    const [i, setI] = useState<number>(0)

    useEffect(() => {
        videoRef.current.src = list[i].file
    }, [i])

    return (
        <div className='cover'>
            <video ref={videoRef} playsInline muted autoPlay
                onEnded={() => i === list.length - 1 ? setI(0) : setI(prev => prev + 1)} />
        </div>
    )
}

export default Cover