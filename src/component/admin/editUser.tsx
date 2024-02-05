'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image';
import UploadButton from '../items/uploadButton';
type Props = {
    archive: string,
    slug: string
}

const EditUser = ({ archive, slug }: Props) => {

    const [currentslug, setCurrentSlug] = useState<string>("")

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [infor, setInfor] = useState<any>({})

    const toPage = useRouter()

    const [backgroundPre, setBackgroundPre] = useState<any>([])


    const getItem = async (slug: string) => {
        if (slug !== "new_") {
            const result = await axios.get(process.env.server_url + "admin/" + archive + "?id=" + slug, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })

            if (result.data.success) {
                setCurrentSlug(result.data.data[0].slug)
                setUsername(result.data.data[0].username)
                setPosition(result.data.data[0].position)
                setInfor(result.data.data[0].infor)
            }
        }
    }

    useEffect(() => {
        getItem(slug)
    }, [slug])

    const getFile = async (e: any) => {

        var files = e.target.files;
        const arrFiles: File[] = Object.values(files)
        arrFiles.map((file: File, index: number) => {
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setBackgroundPre((prev: any) => [...prev, reader.result])
                // setImgFiles((prev: File[]) => [...prev, file])
            }
        })
    }

    return (
        <div className="edit_item">
            <div className='cover'>
                {backgroundPre?.length ? <Image src={backgroundPre[0]} width={100} height={100} alt="background" /> :
                    infor?.background?.length ?
                        <Image src={process.env.google_url + infor?.background[0]} width={100} height={100} alt="background" /> : <div className="cover_img center">
                            <UploadButton icon={<AddAPhotoIcon />} func={(e) => getFile(e)} />
                        </div>
                }
            </div>
            <div className="usernameandavata">
                <div className="avata">

                </div>
                <div className="title">{username}<br></br><span>{position}</span></div>
            </div>
        </div>
    )
}

export default EditUser