'use client'
import { relative } from 'path'
import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
type Props = {
    onChange: (e: any) => void,
    name: React.ReactNode,
    value: any,
    type?: string,
    disabled?: boolean,
    warn?: string,
    icon1?: React.ReactNode,
    icon2?: React.ReactNode
}

const Input = ({ onChange, name, value, type, disabled, warn, icon1, icon2 }: Props) => {

    const inputRef = useRef<any>("")

    return (
        <div className='h-20 text-left relative'>
            <div className="h-2/5 flex flex-col justify-end">
                <p className='opacity-75'>{name} <span className='text-xs text-red-600'>{warn}</span></p>
            </div>
            <input className={`w-full h-3/5 border-2 rounded p-1 focus:border-orange-600 bg-white text-black ${disabled ? "bg-inherit text-slate-500 opacity-25" : ""}`}
                ref={inputRef}
                type={type ? type : "text"}
                onChange={(e) => onChange(e.currentTarget.value)}
                defaultValue={value}
                onFocus={(e) => { e.currentTarget.style.outline = 'none' }}
                disabled={disabled}
                style={{ fontFamily: "revert" }}
            />
            <div className='w-max absolute flex right-1 bottom-0 h-12 text-black'>
                {icon1}{warn ? <CloseIcon className='w-6 h-6 my-auto mx-1 cursor-pointer' onClick={() => { inputRef.current.value = "", onChange("") }} /> : icon2}
            </div>
        </div>
    )
}

export default Input