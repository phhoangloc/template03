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

export const ParallaxMagazine = ({ item, sx, onClick }: ParallaxCardType) => {
    const [_onMouse, set_onMouse] = useState<boolean>(false)
    return (
        <div className={`relative select-none overflow-hidden cursor-pointe  ${sx ? sx : ""}`} onMouseUp={() => { onClick && onClick() }}>
            <div className={`absolute top-0 left-0 w-full h-full z-[1] transition-all duration-500 flex flex-col justify-center p-4 `}>
            </div>
            <div className='h-5/6 w-max overflow-hidden text-center m-auto relative shadow-lg bg-white dark:bg-slate-700 rounded' onMouseEnter={() => set_onMouse(true)} onMouseLeave={() => set_onMouse(false)}>
                <div className="relative h-full aspect-[4/5] px-2">
                    <div className="relative h-1/2  overflow-hidden flex flex-col justify-center p-4 border-b-2 border-slate-200 dark:border-slate-600" >
                        {item.cover ?
                            <Image className={`h-full w-auto opacity-85 m-auto`} width={500} height={500} alt='img' src={process.env.ftp_url + item.cover.name} />
                            : <div className='aspect-square flex flex-col justify-center'></div>}
                    </div>
                    <div className=" bottom-0 z-10 h-1/2 text-left flex flex-col justify-start p-2">
                        <p className="opacity-50 text-xs font-normal text-center pb-1">{item.archive}</p>
                        <p className={`font-bold text-wrap font-serif line-clamp-3 h-[72px] flex flex-col justify-center mb-2 text-center`} title={item.name}>{item.name.toUpperCase()}</p>
                        <div className="text-xs opacity-50 !font-normal line-clamp-2" dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                </div>
            </div>
        </div>
    )
}