import React, { useRef } from 'react'
type Props = {
    name: React.ReactNode | string;
    size?: number
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ name, size, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={`upload_button`} style={{ borderRadius: "5px", cursor: "pointer" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()} style={{ padding: "5px", width: size + "px", height: size + "px" }}>{name}</div>
        </div>
    )
}

export default UploadButton