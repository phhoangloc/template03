import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Button from '../button/button'
import { useRouter } from 'next/navigation'
import { ApiItem } from '@/api/client'
import { ParallaxCard } from '../cards/itemCard'
type Props = {}

const Cover = (props: Props) => {

    const toPage = useRouter()

    const [book, setBook] = useState<any[]>([])
    const [blog, setBlog] = useState<any[]>([])
    const [innerWidth, setInnerWidth] = useState<string>("")

    const [scrollRun, setScrollRun] = useState<boolean>(false)
    const getData = async (a: string, limit: number) => {
        const result = await ApiItem({ archive: a, limit: limit })

        if (result.success) {
            a === "book" && setBook(result.data)
            a === "blog" && setBlog(result.data)
        } else {
            setBook([])
            setBlog([])
        }
    }

    useEffect(() => {

        window.outerWidth < 575 && setInnerWidth("xs")
        window.outerWidth >= 575 && setInnerWidth("sm")
        window.outerWidth >= 768 && setInnerWidth("md")
        window.outerWidth >= 992 && setInnerWidth("lg")
        window.outerWidth >= 1200 && setInnerWidth("xl")

        const handleResize = () => {
            window.outerWidth < 575 && setInnerWidth("xs")
            window.outerWidth >= 575 && setInnerWidth("sm")
            window.outerWidth >= 768 && setInnerWidth("md")
            window.outerWidth >= 992 && setInnerWidth("lg")
            window.outerWidth >= 1200 && setInnerWidth("xl")
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        innerWidth === "xs" && getData("blog", 1)
        innerWidth === "sm" && getData("blog", 2)
        innerWidth === "md" && getData("blog", 2)
        innerWidth === "lg" && getData("blog", 3)
        innerWidth === "xl" && getData("blog", 5)
    }, [innerWidth])


    return (
        <div className='w-sreen h-screen relative bg-amber-50 dark:bg-slate-950 dark:text-white'>
            <Image src="/image/library.webp" fill className='object-cover opacity-25 z-0' alt="cover" />
            <div className="w-full h-full max-w-[1600px] m-auto gap-2 relative z-[1] lg:grid  lg:grid-cols-2">
                <div className='h-1/2 flex flex-col justify-center text-center lg:h-full'>
                    <div className="bg-white dark:bg-slate-800 rounded p-4 shadow-md max-w-max mx-auto w-11/12">
                        <p className='text-3xl font-bold mb-2'>Nice to meet you, today.</p>
                        <p className='text-3xl font-bold'>Can I help you?</p>
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
                <div className='absolute bottom-0 p-2 z-[2] max-w-screen-lg'>
                    <div className="w-max h-max flex  gap-4 overflow-hidden p-4">
                        {
                            blog.map((item, index) =>
                                <ParallaxCard key={index} item={item} sx="!h-[256px] !aspect-square" onClick={() => toPage.push("/" + item.archive + "/" + item.slug)} />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cover