import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Button from '../button/button'
import { useRouter } from 'next/navigation'
import { ApiItem } from '@/api/client'
import { BlogCard } from '../cards/itemCard'
import { useRef } from 'react'
type Props = {}

const Cover = (props: Props) => {

    const toPage = useRouter()

    const [blog, setBlog] = useState<any[]>([])
    const [innerWidth, setInnerWidth] = useState<string>("")

    const [scrollRun, setScrollRun] = useState<boolean>(false)
    const getData = async (a: string, limit: number) => {
        const result = await ApiItem({ archive: a, limit: limit })

        if (result.success) {
            a === "blog" && setBlog(result.data)
        } else {
            setBlog([])
        }
    }

    useEffect(() => {
        getData("blog", 10)
    }, [])


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

    return (
        <div className='w-sreen h-screen relative bg-amber-50 dark:bg-slate-950 dark:text-white'>
            <Image src="/image/library.webp" fill className='object-cover opacity-15 z-0' alt="cover" />
            <div className="w-full h-full max-w-[1600px] m-auto gap-2 relative z-[1] lg:grid  lg:grid-cols-2">
                <div className='h-1/2 flex flex-col justify-end text-center lg:h-full lg:justify-center'>
                    <div className="bg-white dark:bg-slate-800 rounded p-4 shadow-md max-w-max mx-auto w-11/12">
                        <p className='text-3xl font-bold mb-2'>Nice to meet you, today.</p>
                        <p className='text-3xl opacity-75'>would you like to enjopy a cup of coffee ?</p>
                    </div>
                    <div className="flex flex-wrap  mx-auto gap-1 my-4 w-11/12 justify-center p-2">
                        <Button name="Register" onClick={() => toPage.push("/signup")} sx="!m-0 !shadow-lg" />
                        <Button name="Log In" onClick={() => toPage.push("/login")} sx="!m-0 !shadow-lg" />
                    </div>
                </div>
                <div className='h-1/2 lg:h-full lg:flex lg:flex-col lg:justify-end'>
                    <div className=' h-full w-max lg:h-1/2 ml-auto mr-0 mt-auto mb-0'>
                        <div className="h-1/6"></div>
                        <Image src="/image/staff.png" width={500} height={500} className='w-auto h-5/6 ' alt="staff" />
                    </div>
                </div>
                <div className='absolute bottom-0 py-2 z-[2] w-[248px] sm:w-[492px] md:w-[744px] xl:w-[984px] xxl:[w-1476px]  overflow-auto scroll_none ml-2 '
                    ref={parallax}
                    onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setScrollLeft(e.currentTarget.scrollLeft) }}
                    onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
                    onMouseUp={() => { setMountDown(false), setIsScroll(false) }}
                    onMouseLeave={() => { setMountDown(false), setIsScroll(false) }}
                    style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
                >
                    <div className="w-max h-max flex  gap-2"
                        ref={parallaxChild}
                    >
                        {
                            blog.map((item, index) =>
                                <BlogCard key={index} item={item} sx="!h-60 !aspect-square" onClick={() => isScroll === false ? toPage.push("/" + item.archive + "/" + item.slug) : null} />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cover