'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ParallaxCard } from '../cards/itemCard'

type Props = {
    data: any[]
}

const Parallax = ({ data }: Props) => {

    const parallax: any = useRef()
    const parallaxChild: any = useRef()

    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)

    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsScroll(true)
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
        parallax.current.scrollTop = scrollTop - ((e.pageY - startY))
    }

    useEffect(() => {
        parallaxChild.current?.clientWidth ? parallax.current.scrollLeft = `${(parallaxChild.current?.clientWidth - window.innerWidth) / 2}` : null
        parallaxChild.current?.clientHeight ? parallax.current.scrollTop = `${(parallaxChild.current?.clientHeight - window.innerHeight) / 2}` : null
    }, [parallaxChild.current?.clientWidth, parallaxChild.current?.clientHeight])


    const toPage = useRouter()


    return (
        <div ref={parallax}
            className='w-full h-screen scroll_none overflow-auto py-20 cursor-grab active:cursor-grabbing'
            onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setStartY(e.pageY), setScrollTop(e.currentTarget.scrollTop), setScrollLeft(e.currentTarget.scrollLeft) }}
            onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
            onMouseUp={() => { setMountDown(false), setIsScroll(false) }}
            onMouseLeave={() => { setMountDown(false), setIsScroll(false) }}>
            <Image src="/image/library.webp" fill className='object-cover opacity-5 z-0 !fixed' alt="cover" />

            <div ref={parallaxChild} className='w-[4000px] flex flex-wrap justify-center gap-4 md:gap-8 xl:gap-12 z-[1] min-h-full relative' >
                {data.length ? data.map((item, index) =>
                    <ParallaxCard sx="!w-44  md:!w-60 lg:!w-72 h-max" item={item} key={index} onClick={() => isScroll === false ? toPage.push("/" + item.archive + "/" + item.slug) : null} />
                ) :
                    <div> no data</div>
                }
            </div>

        </div>
    )

}

export default Parallax