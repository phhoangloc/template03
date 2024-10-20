import React from "react"
import Image from "next/image"

export const ParallaxCard = ({ item, sx }: { item: any, sx?: string }) => {


    return (
        <div className={`aspect-[3/5] bg-white h-full overflow-hidden rounded shadow-lg hover:-translate-y-10 transition-all duration-200 cursor-pointer ${sx ? sx : ""}`}>
            <div className="h-4/5 relative overflow-hidden">
                {item.cover?.name ?
                    <Image
                        src={process.env.ftp_url + item.cover?.name}
                        fill
                        className="object-cover"
                        priority={true}
                        alt='cover' /> :
                    <div className="w-full h-full flex flex-col justify-center text-center">NO IMAGE</div>
                }
            </div>
            <div className="h-1/5 p-2 bg-slate-50">
                <p className="truncate font-bold text-sm ">{item.name}</p>
                <p className="truncate text-sm opacity-50">{item.archive}</p>
            </div>
        </div>
    )
}