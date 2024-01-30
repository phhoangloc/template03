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
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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

    const [imgPre, setImgPre] = useState<any>()
    const [imgFile, setImgFile] = useState<File>()
    const viewImg = useRef<any>("")

    const toPage = useRouter()


    const save = async (data: any, slug: string) => {
        if (slug !== "new_") {
            const body = {
                slug: data.currentslug,
                name: data.name,
                brand: data.brand,
                price: data.price,
                detail: data.detail,
            }
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
            const body = {
                slug: data.currentslug,
                name: data.name,
                brand: data.brand,
                price: data.price,
                detail: data.detail,
            }
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
                setDetail(result.data.data[0].detail)
            }
        }
    }

    useEffect(() => {
        getItem(slug)
    }, [slug])

    const getPicture = (n: number) => {
        console.log(n)
    }
    const getFile = async (e: any) => {
        var files = e.target.files;
        const arrFiles: File[] = Object.values(files)
        // console.log(files)
        arrFiles.map((file: File, index: number) => {
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                viewImg.current.innerHTML += `
                <div class="imgItem">
                <img src=${reader.result}>
                <svg onclick="${getPicture(index)}" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                </div>
                `
                setImgPre(reader.result)
                setImgFile(file)
            }
        })

    }

    return (
        <div className="edit_item">
            {slug === "new_" ? <h2>create watch</h2> : <h2>update watch</h2>}
            <Input name="slug" value={currentslug} onChange={v => setCurrentSlug(v)} />
            <Input name="name" value={name} onChange={v => setName(v)} />
            <Input name="brand" value={brand} onChange={v => setBrand(v)} />
            <Input name="price" value={price} onChange={v => setPrice(v)} />
            <div className="pictureBox">
                <div className="title">
                    <p>picture</p>
                    <UploadButton icon={<UploadFileIcon />} func={v => getFile(v)} />
                </div>
                <div ref={viewImg} className="viewImg"></div>
            </div>
            <TextArea name="detail" value={detail} onChange={v => setDetail(v)} />
            <Button name={slug === "new_" ? "create" : "save"} onClick={() => save({ currentslug, name, brand, price, detail }, slug)} />
        </div>
    )
}

export default EditItem