import React, { useState } from "react"
import Image from "next/image"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
export type ParallaxCardType = {
    item: any,
    sx?: string,
    onClick?: () => void,
}

export const CardItem = ({ item, sx, onClick }: ParallaxCardType) => {
    return (
        <div className={`relative select-none overflow-hidden cursor-pointe  ${sx ? sx : ""}`}>
            <div className='h-5/6 w-max overflow-hidden text-center m-auto relative shadow-lg bg-white dark:bg-slate-700 rounded'>
                <div className="relative h-full aspect-square px-2">
                    <div className="relative h-2/3  overflow-hidden flex flex-col justify-center p-4 border-b-2 border-slate-200 dark:border-slate-600" >
                        {item.cover ?
                            <Image className={`h-full w-auto opacity-85 m-auto`} width={500} height={500} alt='img' src={process.env.ftp_url + item.cover.name} />
                            : <div className='aspect-square flex flex-col justify-center'></div>}
                    </div>
                    <div className=" bottom-0 z-10 h-1/3 text-left bg-white dark:bg-slate-700 flex flex-col justify-center px-2">
                        <span className="opacity-50 text-xs font-normal">{item.host.username}</span>
                        <p className={`font-bold text-wrap font-serif`} title={item.name}>{item.name.toUpperCase()}</p>
                    </div>
                </div>
            </div>
            <div className="h-1/6 flex flex-col text-center justify-center">
                <div className="flex justify-between">
                    <div className="flex">
                        <ThumbUpIcon className="!w-8 !h-8 p-1 cursor-pointer" />
                        <p className="p-1">0</p>
                        <CommentIcon className="!w-8 !h-8 p-1 cursor-pointer" />
                        <p className="p-1">0</p>
                    </div>
                    <KeyboardArrowRightIcon className="!w-9 !h-9 p-1 cursor-pointer" onClick={() => { onClick && onClick() }} />
                </div>
            </div>
        </div>
    )
}

export const CardBook = ({ item, sx, onClick }: ParallaxCardType) => {

    return (
        <div className={`w-60 md:w-64 xl:w-72 cardIn  relative select-none   flex flex-col justify-end p-4  ${sx ? sx : ""}`} onClick={() => onClick && onClick()}>

            <div className={`w-full h-max overflow-hidden text-center border border-slate-200 dark:border-slate-700 relative rounded transition-all duration-500 hover:-translate-y-3 hover:shadow-lg`} >
                <div className="relative overflow-hidden flex flex-col justify-center rounded" >
                    {item.cover ?
                        <Image className={`h-auto w-full m-auto pointer-events-none`} width={500} height={500} alt='img' src={process.env.ftp_url + item.cover.name} /> :
                        <div className='aspect-square flex flex-col justify-center'></div>}
                </div>
            </div>

        </div>
    )
}
export const CardBlog = ({ item, sx, onClick }: ParallaxCardType) => {

    return (
        <div className={`w-max cardIn relative select-none  flex flex-col justify-end p-4  ${sx ? sx : ""}`} onClick={() => onClick && onClick()}>
            <div className={`w-full h-max overflow-hidden text-center relative border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded transition-all duration-500  hover:-translate-y-3 hover:shadow-lg`} >
                <div className="relative overflow-hidden flex flex-col justify-center " >
                    {item.cover ?

                        <Image className={`h-28 md:h-32 lg:h-36 xl:h-44 w-auto transition-all duration-500 pointer-events-none`} width={500} height={500} alt='img' src={process.env.ftp_url + item.cover.name} /> :
                        <div className='aspect-square flex flex-col justify-center'></div>}
                </div>
                <div className={`h-12 w-full relative mt-2`}>
                    <p className={`font-bold text-wrap line-clamp-2 h-12 overflow-hidden text-center absolute w-full px-4 `} title={item.name}>{item.name.toUpperCase()}</p>
                </div>
                <div className="h-24"></div>
                <div className="w-full absolute z-[0] text-left flex bottom-0 h-24 gap-4 p-4">
                    <p className="font-bold text-center font-serif  flex flex-col justify-center h-max m-auto border-b-2">{item.archive.toUpperCase()}</p>
                    <div className="text-xs  !font-normal line-clamp-4 h-max m-auto opacity-75" dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
            </div>
        </div>
    )
}
export const ParallaxCard = ({ item, onClick }: ParallaxCardType) => {
    return (
        item.archive === "book" ?
            <CardBook item={item} onClick={() => onClick && onClick()} />
            :
            <CardBlog item={item} onClick={() => onClick && onClick()} />
    )
}