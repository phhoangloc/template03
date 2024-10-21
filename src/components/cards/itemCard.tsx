import React from "react"
import Image from "next/image"
export type ParallaxCardType = { item: any, sx?: string, onClick?: () => void }
export const ParallaxCard = ({ item, sx, onClick }: ParallaxCardType) => {
    return (
        <div className={` bg-white overflow-hidden shadow-sm transition-all duration-200 cursor-pointer grid grid-rows-12 p-2 rounded ${sx ? sx : ""}`} onClick={() => onClick && onClick()}>
            <div className="h-full w-full row-span-2 flex flex-col justify-center">
                <p className="font-bold text-sm w-max  h-max px-2 rounded bg-orange-600 text-white">{item?.archive}</p>
            </div>
            <div className="row-span-6 relative w-full rounded overflow-hidden ">
                {item?.cover?.name ?
                    <Image
                        src={process.env.ftp_url + item.cover?.name}
                        fill
                        className="object-cover"
                        priority={true}
                        alt='cover' /> :
                    <div className="w-full h-full flex flex-col justify-center text-center">NO IMAGE</div>
                }
            </div>
            <div className="h-full w-full row-span-4 p-2">
                <p className="text-xs leading-5">{item?.host.username}</p>
                <p className="font-bold text-sm leading-5">{item?.name}</p>
            </div>
        </div>
    )
}

export const DetailCard = ({ item, sx, onClick }: ParallaxCardType) => {
    return (
        <div className={` bg-white overflow-hidden shadow-sm transition-all duration-200 cursor-pointer grid grid-rows-12 p-2 rounded ${sx ? sx : ""}`} onClick={() => onClick && onClick()}>
            <div className="h-full w-full row-span-2 flex flex-col justify-center">
                <p className="font-bold text-sm w-max  h-max px-2 rounded bg-orange-600 text-white">{item?.archive}</p>
            </div>
            <div className="row-span-6 relative w-full rounded overflow-hidden ">
                {item?.cover?.name ?
                    <Image
                        src={process.env.ftp_url + item.cover?.name}
                        fill
                        className="object-cover"
                        priority={true}
                        alt='cover' /> :
                    <div className="w-full h-full flex flex-col justify-center text-center">NO IMAGE</div>
                }
            </div>
            <div className="h-full w-full row-span-4 p-2">
                <p className="text-xs leading-5">{item?.host.username}</p>
                <p className="font-bold text-sm leading-5">{item?.name}</p>
            </div>
        </div>
    )
}