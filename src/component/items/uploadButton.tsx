import React, { useRef } from 'react'
import '../style/style.css'
type Props = {
    icon: React.ReactNode | string;
    sx?: string
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ sx, icon, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={`upload_button ${sx ? sx : ""}`}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()}>{icon}</div>
        </div>
    )
}

export default UploadButton