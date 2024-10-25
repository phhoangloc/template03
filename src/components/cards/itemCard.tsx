import React, { useState } from "react"
import Image from "next/image"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export type ParallaxCardType = {
    item: any,
    sx?: string,
    onClick?: () => void,
}
export const BlogCard = ({ item, sx, onClick }: ParallaxCardType) => {
    return (
        <div
            style={{ scrollSnapAlign: "start" }}
            className={`relative bg-white dark:bg-slate-700 overflow-hidden shadow-md transition-all duration-200 cursor-pointer grid grid-rows-12 p-2 rounded ${sx ? sx : ""}`} onMouseUp={() => onClick && onClick()}>
            <div className="absolute w-full h-full top-0 left-0 z-[1]  select-none"></div>
            <div className="row-span-6 relative w-full rounded overflow-hidden select-none ">
                {item?.cover?.name ?
                    <Image
                        src={process.env.ftp_url + item.cover?.name}
                        fill
                        className="object-cover select-none z-[0]"
                        priority={true}
                        alt='cover' /> :
                    <div className="w-full h-full flex flex-col justify-center text-center">NO IMAGE</div>
                }
            </div>
            <div className="row-span-1  select-none"></div>
            <div className="h-full w-full row-span-4 px-2  select-none">
                <p className="text-xs leading-5">{item.archive}</p>
                <p className="font-bold leading-5">{item?.name}</p>
            </div>
            <div className="row-span-1"></div>

        </div>
    )
}

export const BookCard = ({ item, sx, onClick }: ParallaxCardType) => {
    return (
        <div
            style={{ scrollSnapAlign: "start" }}
            className={`relative overflow-hidden shadow-md transition-all duration-200 cursor-pointer grid rounded ${sx ? sx : ""}`} onMouseUp={() => onClick && onClick()}>
            <div className="absolute w-full h-full top-0 left-0 z-[1]  select-none"></div>
            <div className="row-span-12 relative w-full rounded overflow-hidden select-none ">
                {item?.cover?.name ?
                    <Image
                        src={process.env.ftp_url + item.cover?.name}
                        width={500}
                        height={500}
                        className="h-auto w-full select-none z-[0]"
                        priority={true}
                        alt='cover' /> :
                    <div className="w-full h-full flex flex-col justify-center text-center">NO IMAGE</div>
                }
            </div>
            <div className="row-span-1 text-lg font-bold leading-6 py-2">
                <span className="text-sm opacity-50">{item.host.username}</span>
                <br></br>
                {item.name}
            </div>
        </div>
    )
}

export const ParallaxCard = ({ item, sx, onClick }: ParallaxCardType) => {
    const [_onMouse, set_onMouse] = useState<boolean>(false)
    return (

        <div className={` rounded select-none overflow-hidden w-full ${sx ? sx : ""}`} onMouseUp={() => { onClick && onClick() }}>
            <div className=' overflow-hidden flex flex-col justify-center text-center m-auto relative w-full aspect-square rounded ' onMouseEnter={() => set_onMouse(true)} onMouseLeave={() => set_onMouse(false)}>
                <div className={`absolute top-0 left-0 w-full h-full z-[1] transition-all duration-500 flex flex-col justify-center p-4 ${_onMouse ? "backdrop-brightness-50 backdrop-blur-sm" : ""}`}>
                    <div className={`text-sm md:text-base  text-left text-white  ${_onMouse ? "opacity-100" : "opacity-0"}`} title={item.name} dangerouslySetInnerHTML={{ __html: item.content.split(".")[0] + "..." }}></div>
                </div>
                {item.cover ?
                    item.archive === "book" ?
                        <Image className={`object-contain `} alt='img' fill src={process.env.ftp_url + item.cover.name} />
                        : <Image className={`object-cover `} alt='img' fill src={process.env.ftp_url + item.cover.name} />
                    : <div className='aspect-square flex flex-col justify-center'>NO IMAGE</div>}
            </div>
            <div className={`border-2 mt-2 transition-all duration-500 m-auto  ${_onMouse ? " border-orange-500 w-full" : "border-transparent w-0"}`}></div>
            <div className='py-4 m-auto text-center'>
                <p className='opacity-75 text-xs md:text-sm'>{item.archive}</p>
                <p className={`text-sm md:text-base font-bold text-left `} title={item.name}>{item.name}</p>
            </div>
        </div>


    )
}