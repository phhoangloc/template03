import React, { useState } from 'react'
import Image from 'next/image'
import UploadButton from '../items/uploadButton';
import CheckIcon from '@mui/icons-material/Check';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import PendingIcon from '@mui/icons-material/Pending';
import '../style/style.css'
type Props = {
    src: string | undefined,
    updatePicture: (e: string) => void
}

const UploadPicture = ({ src, updatePicture }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [pre, setPre] = useState<any>()
    const [file, setFile] = useState<any>()

    const getFile = async (e: any) => {

        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setPre(reader.result)
            setFile(file)
        }
    }

    const uploadFile = async (file: File) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)
        const fileUpload = await axios.post(process.env.server_url + "admin/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        })
        fileUpload.data && setLoading(false)
        updatePicture(fileUpload.data)

    }

    const cancel = () => {
        setPre("")
    }

    return (
        <div className='UploadPicture'>
            {pre ? <Image src={pre} width={500} height={500} alt='pic' priority={true} /> : src ? <Image src={src} width={500} height={500} alt='pic' priority={true} /> : <div className='nopicture'></div>}
            <div className="tool">
                {pre ? <CloseIcon onClick={() => cancel()} /> : <UploadButton icon={<AddAPhotoIcon />} func={(e) => getFile(e)} />}
                {pre ? loading ? <PendingIcon /> : <CheckIcon onClick={() => uploadFile(file)} /> : null}
            </div>
        </div>
    )
}

export default UploadPicture