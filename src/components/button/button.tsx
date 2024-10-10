"use client"
import React, { useRef } from 'react'
type Props = {
    onClick: () => void,
    name: React.ReactNode,
    disable?: boolean,
    sx?: string,
}

const Button = ({ onClick, name, disable, sx }: Props) => {


    return (
        <button
            className={`h-12 w-48 ${disable ? "opacity-10" : " opacity-100"} bg-orange-500 border-orange-50 my-4 mx-auto rounded text-white ${sx} `}
            disabled={disable ? disable : false}
            onClick={() => onClick()}>
            {name}
        </button>
    )
}

export default Button

type PropUploadButtons = {
    icon: React.ReactNode | string;
    size?: number
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadButton = ({ icon, size, func }: PropUploadButtons) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={`upload_button`} style={{ borderRadius: "5px", cursor: "pointer" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()} style={{ padding: "5px", width: size + "px", height: size + "px" }}>{icon}</div>
        </div>
    )
}

