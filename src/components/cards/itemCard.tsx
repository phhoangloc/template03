import React, { useState } from "react"
import Image from "next/image"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export type ParallaxCardType = {
    item: any,
    type?: string,
    sx?: string,
    onClick?: () => void,
}

export const ParallaxCard = ({ type, item, sx, onClick }: ParallaxCardType) => {
    const [_onMouse, set_onMouse] = useState<boolean>(false)
    if (type === "card") {
        return (

            <div className={`rounded select-none overflow-hidden w-full cursor-pointer  ${sx ? sx : ""}`} onMouseUp={() => { onClick && onClick() }}>
                <div className=' overflow-hidden flex flex-col justify-center text-center m-auto relative w-full aspect-square rounded h-2/3' onMouseEnter={() => set_onMouse(true)} onMouseLeave={() => set_onMouse(false)}>
                    {item.cover ?
                        item.archive === "book" ?
                            <Image className={`object-contain `} alt='img' fill src={process.env.ftp_url + item.cover.name} />
                            : <Image className={`object-cover `} alt='img' fill src={process.env.ftp_url + item.cover.name} />
                        : <div className='aspect-square flex flex-col justify-center'>NO IMAGE</div>}
                </div>
                <div className='py-4 m-auto text-center h-1/3'>
                    <p className='opacity-75 text-xs md:text-sm'>{item.archive}</p>
                    <p className={`text-sm md:text-base font-bold  `} title={item.name}>{item.name}</p>
                </div>
            </div>
        )
    }
    return (

        <div className={`rounded select-none overflow-hidden w-full cursor-pointer  ${sx ? sx : ""}`} onMouseUp={() => { onClick && onClick() }}>
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
            <div className='py-4 m-auto text-center'>
                <p className='opacity-75 text-xs md:text-sm'>{item.archive}</p>
                <p className={`text-sm md:text-base font-bold  `} title={item.name}>{item.name}</p>
            </div>
        </div>
    )
}