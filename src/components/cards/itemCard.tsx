import React from "react"
import Image from "next/image"
export type ParallaxCardType = { item: any, sx?: string, onClick?: () => void }
export const ParallaxCard = ({ item, sx, onClick }: ParallaxCardType) => {
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
