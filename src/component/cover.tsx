'use client'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const Cover = (props: Props) => {

    const videoRef = useRef<any>()
    const list = [
        {
            file: "video/casio.mp4",
        },
        {
            file: "video/rolex.mp4",
        },
        {
            file: "video/orient.mp4",
        },
        {
            file: "video/citizen.mp4",
        },
        {
            file: "video/ck.mp4",
        },
    ]

    const [i, setI] = useState<number>(0)

    useEffect(() => {
        videoRef.current.src = list[i].file
    }, [i])

    return (
        <div className='cover'>
            <video ref={videoRef} autoPlay playsInline muted
                onEnded={() => i === list.length - 1 ? setI(0) : setI(prev => prev + 1)} />
        </div>
    )
}

export default Cover