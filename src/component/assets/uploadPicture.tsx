import React, { useState } from 'react'
import Image from 'next/image'
import UploadButton from '../items/uploadButton';
import CheckIcon from '@mui/icons-material/Check';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import PendingIcon from '@mui/icons-material/Pending';
import '../style/style.css'
import store from '@/redux/store';
import { setNotice } from '@/redux/reducer/noticeReducer';
type Props = {
    src: string | undefined,
    updatePicture: (e: string) => void
}

const UploadPicture = ({ src, updatePicture }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [pre, setPre] = useState<any>()
    const [file, setFile] = useState<any>()
    const [name, setName] = useState<string>("")

    const getFile = async (e: any) => {
        setName("")
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
        if (fileUpload.data.success === false) {
            const fileUploadbyUser = await axios.post(process.env.server_url + "myuser/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.token,
                },
            })
            console.log(fileUploadbyUser)
            if (fileUploadbyUser.data.success === false) {
                store.dispatch(setNotice({ success: fileUploadbyUser.data.success, open: true, msg: fileUploadbyUser.data.message }))
                setTimeout(() => {
                    store.dispatch(setNotice({ success: fileUploadbyUser.data.success, open: false, msg: "" }))
                }, 3000)
                setLoading(false)

            } else {
                fileUploadbyUser.data && setLoading(false)
                updatePicture(fileUploadbyUser.data)
                setName(fileUploadbyUser.data)
            }

        } else {
            fileUpload.data && setLoading(false)
            updatePicture(fileUpload.data)
            setName(fileUpload.data)
        }

    }

    const cancel = () => {
        setPre("")
    }

    return (
        <div className='UploadPicture'>
            {pre ? <Image src={pre} width={500} height={500} alt='pic' priority={true} /> : src ? <Image src={src} width={500} height={500} alt='pic' priority={true} /> : <div className='nopicture'></div>}
            <div className="tool">
                {pre && !name ? <CloseIcon onClick={() => cancel()} /> : <UploadButton icon={<AddAPhotoIcon />} func={(e) => getFile(e)} />}
                {pre && !name ? loading ? <PendingIcon /> : <CheckIcon onClick={() => uploadFile(file)} /> : null}
            </div>
        </div>
    )
}

export default UploadPicture