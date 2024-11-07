import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
// import { BookCard } from './itemCard'
import { useRouter } from 'next//navigation'
type Props = {
    place: string,
    data: any[]
}

const ListBookCard = ({ place, data }: Props) => {
    const parallax: any = useRef()
    const parallaxChild: any = useRef()

    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [scrollLeftAfter, setScrollLeftAfter] = useState<number>(0)


    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsScroll(true)
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
    }

    const toPage = useRouter()

    if (place === "home") {
        return (
            <div className="w-full min-h-screen bg-amber-50 dark:bg-slate-800 dark:text-white flex flex-col justify-center relative p-2">
                <div className="absolute w-1/2 aspect-square bottom-0 left-0 z-0">
                    <Image src={"/image/bookcover.png"} fill className="w-full opacity-50" alt="bookcover" />
                </div>
                <div className="max-w-screen-xxl m-auto h-max z-[1]">
                    <div className="font-bold text-3xl mb-4">NEWEST BOOK</div>
                    <div className=' bottom-0 py-2 z-[2] w-[188px] sm:w-[384px] md:w-[768px] lg:w-[960px] xl:w-[1152px] xxl:w-[1536px]  overflow-auto scroll_none '
                        ref={parallax}
                        onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setScrollLeft(e.currentTarget.scrollLeft) }}
                        onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
                        onMouseUp={() => { setMountDown(false), setIsScroll(false) }}
                        onMouseLeave={() => { setMountDown(false), setIsScroll(false) }}
                        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
                    >
                        <div className="w-max h-max flex  gap-2" ref={parallaxChild}>
                            {
                                data.map((item, index) =>
                                    // <BookCard key={index} item={item} sx="!w-[188px]" onClick={() => isScroll === false ? toPage.push("/" + item.archive + "/" + item.slug) : null} />
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div>ListBookCard</div>
    )
}

export default ListBookCard