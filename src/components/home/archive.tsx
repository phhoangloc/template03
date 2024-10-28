import React, { useEffect, useRef, useState } from 'react'
import { ParallaxCard } from '../cards/itemCard'
import { useRouter } from 'next/navigation'
type Props = {
    archive: string
    data: any[]
}

const ArchiveItem = ({ archive, data }: Props) => {
    const parallax: any = useRef()
    const parallaxChild: any = useRef()

    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)


    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsScroll(true)
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
    }

    const toPage = useRouter()
    return (
        <div className=" max-w-screen-xxl m-auto pt-16 p-4">

            <h1 className='text-3xl font-bold pb-4 max-w-screen-lg m-auto'>{archive.toLocaleUpperCase()}</h1>
            <div className='w-full overflow-auto scroll_none max-w-screen-lg m-auto'
                ref={parallax}
                onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setScrollLeft(e.currentTarget.scrollLeft) }}
                onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
                onMouseUp={() => { setMountDown(false), setIsScroll(false) }}
                onMouseLeave={() => { setMountDown(false), setIsScroll(false) }}
                style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
            >
                <div className="w-100% grid grid-cols-2 md:grid-cols-3 gap-2" ref={parallaxChild}>
                    {
                        data.map((item, index) =>
                            <ParallaxCard key={index} item={item} type='card' onClick={() => toPage.push("/" + item.archive + "/" + item.slug)} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ArchiveItem