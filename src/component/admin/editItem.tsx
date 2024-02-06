'use client'
import React, { useEffect, useRef, useState } from 'react'
import Input from '../items/input'
import TextArea from '../items/textarea'
import Button from '../items/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import UploadButton from '../items/uploadButton'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SyncIcon from '@mui/icons-material/Sync';
import Image from 'next/image'
type Props = {
    archive: string,
    slug: string
}

const EditItem = ({ archive, slug }: Props) => {

    const [currentslug, setCurrentSlug] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [brand, setBrand] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [detailIn, setDetailIn] = useState<string>("")
    const [imgs, setImg] = useState<string[]>([])

    const [imgPres, setImgPres] = useState<any>([])
    const [imgFiles, setImgFiles] = useState<File[]>([])
    const [imgNames, setImgNames] = useState<string[] | undefined>()
    const [viewImg, setViewImg] = useState<React.ReactNode>()
    const [loading, setLoading] = useState<boolean>(false)
    const toPage = useRouter()

    const uploadCover = async (file: File) => {
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
        return fileUpload.data

    }
    const uploadImage = (files: File[]) => {
        setImgNames(imgNames)
        files.map(async (file: File) => {
            const img = await uploadCover(file)
            setImgNames(pre => pre ? [...pre, img] : [img])
        })
    }


    const save = async (data: any, slug: string, imgNames: any) => {

        const body = {
            slug: data.slug,
            img: imgNames,
            name: data.name,
            brand: data.brand,
            price: data.price,
            detail: data.detail,
        }

        if (slug !== "new_") {

            const result = await axios.put(process.env.server_url + `admin/${archive}?id=${slug}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })
            if (result.data.success) {
                toPage.push("/admin/watch/")
            }
        } else {
            const result = await axios.post(process.env.server_url + `admin/${archive}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })
            if (result.data.success) {
                toPage.push("/admin/watch/")
            }
        }

    }


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
                setName(result.data.data[0].name)
                setBrand(result.data.data[0].brand)
                setPrice(result.data.data[0].price)
                setDetailIn(result.data.data[0].detail)
                setImgPres(result.data.data[0].img)
                setImgNames(result.data.data[0].img)
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
                setImgPres((prev: any) => [...prev, reader.result])
                setImgFiles((prev: File[]) => [...prev, file])
            }
        })
    }

    const getIndexImg = (i: number) => {
        setImgPres(imgPres.filter((item: any, index: number) => index !== i))
        setImgFiles(imgFiles.filter((item: any, index: number) => index !== i))
        setImgNames(imgNames && imgNames.filter((item: any, index: number) => index !== i))
    }

    const preImg = (imgs: any) => {
        setViewImg(
            imgs.length ?
                imgs.reverse().map((img: any, index: number) =>
                    <div className="imgItem" key={index}>
                        {img.indexOf("data:image/jpeg") !== -1 ?
                            <Image key={index} src={img} width={100} height={100} alt='fromgg' priority={true} /> :
                            <Image key={index} src={process.env.google_url + img} width={100} height={100} alt='fromgg' priority={true} />}
                        <CloseIcon onClick={() => getIndexImg(index)} />
                    </div>) :
                []
        )
    }

    useEffect(() => {
        preImg(imgPres)
    }, [imgPres])

    return (
        <div className="edit_item">
            {slug === "new_" ? <h2>create watch</h2> : <h2>update watch</h2>}
            <a href={"/home/" + archive + "/" + currentslug} target='_blank'><Button name='preview' onClick={() => { }} /></a>
            <Input name="slug" value={currentslug} onChange={v => setCurrentSlug(v)} />
            <Input name="name" value={name} onChange={v => setName(v)} />
            <Input name="brand" value={brand} onChange={v => setBrand(v)} />
            <Input name="price" value={price} onChange={v => setPrice(v)} />
            <div className="pictureBox">
                <div className="title">
                    <p>picture</p>
                    <UploadButton icon={<UploadFileIcon />} func={v => getFile(v)} />
                    {loading ? <SyncIcon /> : <CheckIcon onClick={() => uploadImage(imgFiles)} />}
                </div>
                <div className="viewImg">{viewImg}</div>
            </div>
            <TextArea name="detail" value={detailIn} onChange={v => setDetail(v)} />
            <Button name={slug === "new_" ? "create" : "save"} onClick={() => save({ slug: currentslug, name, brand, price, detail: detail || detailIn }, slug, imgNames)} />
        </div>
    )
}

export default EditItem

//

