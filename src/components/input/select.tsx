import React, { ReactNode, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type TitleProps = {
    data: { title: string, func: (v: string) => void }[],
    title: string,
    func?: () => void,
    sx?: string,
}

export const TitleDrop = ({ data, title, func, sx }: TitleProps) => {
    const [drop, setDrop] = useState<boolean>(false)
    return (
        <div className={`relative ${sx}`}>
            <div className='flex h-12 border-[1px] border-slate-200 dark:border-slate-700 rounded ' onClick={() => { setDrop(!drop), func && func() }}>
                <div className="flex justify-center flex-col text-center w-full cursor-pointer ">
                    {title}
                </div>
                <KeyboardArrowDownIcon className='!w-6 !h-6 my-3' />
            </div>
            <div className={`transition-all duration-100 overflow-hidden absolute z-[1]  bg-white dark:bg-slate-900 top-0 w-full shadow-md ${drop ? "border-[1px]" : "border-0"} border-slate-200 dark:border-slate-700 rounded`} style={{ height: drop && data?.length ? data.length * 3 + "rem" : 0 }} >
                {data?.length ? data.map((d: { title: string, func: (v: string) => void }, index: number) =>
                    <div key={index} className='flex flex-col justify-center opacity-50 hover:opacity-100 p-1 box-border h-12 cursor-pointer text-center ' onClick={() => { d.func(d.title), setDrop(false) }}>
                        {d?.title}
                    </div>
                ) : null}
            </div >
        </div>
    )
}

type IconProps = {
    data: { title: string, func: (v: string) => void }[],
    icon: ReactNode,
    func?: () => void,
    sx?: string,
}

export const IconDrop = ({ data, icon, func, sx }: IconProps) => {
    const [drop, setDrop] = useState<boolean>(false)
    return (
        <div className={`relative ${sx}`}>
            <div className='flex h-12 w-12 p-2  ' onClick={() => { setDrop(!drop), func && func() }}>
                <div className="relative w-full h-full rounded-[50%] overflow-hidden">
                    {icon}
                </div>
            </div>
            <div className={`transition-all duration-100 overflow-hidden absolute z-[1]  bg-white dark:bg-slate-900 top-12 right-0 w-36 shadow-md ${drop ? "border-[1px]" : "border-0"} border-slate-200 dark:border-slate-700 rounded`} style={{ height: drop && data?.length ? data.length * 3 + "rem" : 0 }} >
                {data?.length ? data.map((d: { title: string, func: (v: string) => void }, index: number) =>
                    <div key={index} className='flex flex-col justify-center opacity-50 hover:opacity-100 p-1 box-border h-12 cursor-pointer text-center ' onClick={() => { d.func(d.title), setDrop(false) }}>
                        {d?.title}
                    </div>
                ) : null}
            </div >
        </div>
    )
}