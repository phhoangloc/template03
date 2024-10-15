'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add';
import { setAlert } from '@/redux/reducer/alertReducer'
import { AlertType } from '@/redux/reducer/alertReducer'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ApiDeleteItem, ApiItemUser, ApiUploadFile } from '@/api/user'
import Input from '../input/input'
import { setNotice } from '@/redux/reducer/noticeReducer'
import Pagination from '../pagination/pagination'
import UploadButton from '../button/uploadButton'
import { setModal } from '@/redux/reducer/ModalReducer'
import { ModalType } from '@/redux/reducer/ModalReducer'
type Props = {
    archive: string
}
export const Archive = ({ archive }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))

    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()
    const [isPageNoFound, setIsPageNotFound] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isUpload, setIsUpload] = useState<boolean>(false)
    const [i, setI] = useState<number>(0)

    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(24)
    const [isEnd, setIsEnd] = useState<boolean>(true)

    const [file, setFile] = useState<File | undefined>()
    const [loadingcurrent, setLoadingCurrent] = useState<number>(0)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<number>(0)

    const [id, setId] = useState<string>("")
    const [isDelete, setIsDelete] = useState<boolean>(false)

    const getItems = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined, sort: string) => {
        setIsLoading(true)
        const result = await ApiItemUser({ position: p, archive: a, search: s, skip: skip, limit: li, sort: sort })
        if (result.error) {
            setIsPageNotFound(true)
            setIsLoading(false)
        } else {
            setIsPageNotFound(false)
            if (result.success) {
                setIsLoading(false)
                setItems(result.data)
            } else {
                setIsLoading(false)
                setItems([])

            }
        }
    }
    const getItemPlus = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined, sort: string) => {
        const result = await ApiItemUser({ position: p, archive: a, search: s, skip: skip, limit: li, sort: sort })
        if (result.data?.length) {
            setIsEnd(false)
        } else {
            setIsEnd(true)
        }
    }
    const deleteItem = (id: string) => {
        store.dispatch(setAlert({ open: true, value: false, msg: "are you sure to want to delete this " + archive }))
        setId(id)
        setIsDelete(true)
    }

    useEffect(() => {
        if (currentAlert.value && isDelete) {
            const deleteItemAgain = async (p: string, a: string, id: string) => {
                const result = await ApiDeleteItem({ position: p, archive: a, id: id })
                if (result) {
                    const interval = setInterval(() => {
                        setLoadingCurrent(v => v + 0.025)
                    }, 50)
                    setTimeout(() => {
                        clearInterval(interval)
                        setLoadingButton(false)
                        setIsDelete(false)
                        setRefresh(n => n + 1)
                    }, 500)
                }
            }
            currentUser.position && id && deleteItemAgain(currentUser.position, archive, id)
        }
    }, [currentAlert, currentUser, isDelete, id])
    useEffect(() => {
        currentUser.position && getItems(currentUser.position, archive, search, page * limit, limit, "")
        currentUser.position && getItemPlus(currentUser.position, archive, search, (page + 1) * limit, limit, "")
    }, [currentUser.position, search, page, refresh])

    useEffect(() => {
        loadingButton && setLoadingCurrent(0)
        const interval = loadingButton ? setInterval(() => {
            setLoadingCurrent(v => v + 0.025)
        }, 50) : undefined;

        setTimeout(() => {
            clearInterval(interval)
        }, 1500)
    }, [loadingButton])

    if (isPageNoFound) {
        return (
            <div className='dark:text-white'>
                NOT FOUND
            </div>
        )
    }
    return (
        <div className='bg-white dark:bg-slate-800  rounded shadow-md p-4 grid gap-2 grid-cols-1'>
            <div className='flex border-b-2 dark:border-slate-700'>
                <div className="flex h-12">
                    <h3 className='text-xl font-bold text-orange-600 dark:text-white h-full flex flex-col justify-center'>{archive.toUpperCase()} </h3>
                    <AddIcon className='!w-12 !h-full p-3 opacity-50 hover:opacity-100 cursor-pointer text-orange-600 dark:text-white' onClick={() => toPage.push(archive + "/news")} />
                </div>
                {/* <SearchBox placehoder='search' func={(v) => setSearch(v)} /> */}
            </div>
            <div className="h-12 flex flex-col justify-end font-bold">
                <h4>Title</h4>
            </div>
            {isLoading ? <p>loading...</p> :
                items?.length ?
                    items.map((n: any, index: number) =>
                        <div key={index} className={`h-12 flex justify-between`} >
                            <div className="flex flex-col justify-center  text-sm md:text-base cursor-pointer" style={{ width: "calc(100% - 96px)" }}>
                                <h4 title={n.name} className={`truncate font-semibold w-full hover:text-orange-600`}
                                    onClick={() => toPage.push(n.slug ? "/admin/" + n.archive + "/" + n.slug : "/admin/" + n.archive + "/" + n.id)}
                                >
                                    {n.username || n.name}
                                </h4>
                                <p className="text-xs opacity-50"> {n.position || n.updateDate && moment(n.updateDate).format("MM/DD") || moment(n.createDate).format("MM/DD")} - {n.host.username}</p>
                            </div>

                            <div className="w-max flex h-12">
                                {archive === "page" ?
                                    <Link className='h-full m-auto' style={{ textDecoration: "none", color: "inherit" }} href={"/" + n.slug} target='_blank'>
                                        <RemoveRedEyeOutlinedIcon className='!w-12 !h-full p-3 m-auto opacity-50 hover:opacity-100  text-orange-600 dark:text-white ' />
                                    </Link>
                                    : <Link className='h-max m-auto' style={{ textDecoration: "none", color: "inherit" }} href={n.slug ? "/" + n.archive + "/" + n.slug : "/" + n.archive + "/" + n.id} target='_blank'>
                                        <RemoveRedEyeOutlinedIcon className='!w-12 !h-full p-3 m-auto opacity-50 hover:opacity-100  text-orange-600 dark:text-white ' />
                                    </Link>}
                                <DeleteOutlineOutlinedIcon className='!w-12 !h-full p-3 m-auto opacity-50 hover:opacity-100 cursor-pointer text-orange-600 dark:text-white ' onClick={() => deleteItem(n.id)} />
                            </div>
                        </div>

                    ) :
                    <div className='flex h-12 justify-between relative p-2'>there are no {archive}</div>}
            <div className="h-12">

            </div>
            <div className='flex border-t-2 dark:border-slate-700 '>
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={isEnd} />
            </div>
        </div>
    )
}

type PropsArchivePic = {
    edit?: boolean,
    defaultlimit?: number,
    type?: string
}

export const ArchivePic = ({ edit, defaultlimit, type }: PropsArchivePic) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentModal, setCurrentModal] = useState<ModalType>(store.getState().modal)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentModal(store.getState().modal))

    }
    useEffect(() => {
        update()
    })

    useEffect(() => {
        update()
    })
    const toPage = useRouter()
    const archive = "pic"
    const [items, setItems] = useState<any[]>([])
    const [isEnd, setIsEnd] = useState<boolean>(true)
    const [refresh, setRefresh] = useState<number>(0)

    const [search, setSearch] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)

    const [id, setId] = useState<string>("")
    const [file, setFile] = useState<File | undefined>()
    const [files, setFiles] = useState<FileList>()
    const [isUpload, setIsUpload] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(defaultlimit ? defaultlimit : 24)

    const [isCopyLink, setIsCopyLink] = useState<boolean>(false)
    const [i, setI] = useState<number>(-1)

    const getItems = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined) => {
        setLoading(true)
        const result = await ApiItemUser({ position: p, archive: a, search: s, skip: skip, limit: li })
        if (result.success) {
            setLoading(false)
            setItems(result.data)
        } else {
            setLoading(false)
            setItems([])
        }
    }
    const getItemPlus = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined) => {
        const result = await ApiItemUser({ position: p, archive: a, search: s, skip: skip, limit: li })
        if (result.success && result.data.length) {
            setIsEnd(false)
        } else {
            setIsEnd(true)
        }
    }

    useEffect(() => {
        currentUser.position && getItems(currentUser.position, archive, search, page * limit, limit)
        currentUser.position && getItemPlus(currentUser.position, archive, search, (page + 1) * limit, limit)
    }, [currentUser.position, refresh, page, search])

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            store.dispatch(setAlert({ value: false, msg: "do you want to update this picture", open: true }))
            setIsUpload(true)
            if (files.length > 1) {
                setFiles(files)
            } else {
                setFile(file)
            }
        }
    }

    useEffect(() => {
        if (currentAlert.value && isUpload) {
            const UpdateImage = async (p: string, a: string, f: File) => {
                setLoadingButton(true)
                const result = await ApiUploadFile({ position: p, archive: a, file: f })
                if (result) {
                    setLoadingButton(false)
                    setIsUpload(false)
                    setRefresh(r => r + 1)
                }
            }
            currentUser.position && file && UpdateImage(currentUser.position, "pic", file)
        }
    }, [currentAlert, currentUser, isUpload, file])
    useEffect(() => {
        if (currentAlert.value && isUpload && files?.length) {
            const UpdateImage = async (p: string, a: string, f: File) => {
                setLoadingButton(true)
                const result = await ApiUploadFile({ position: p, archive: a, file: f })
                if (result) {
                    setLoadingButton(false)
                    setIsUpload(false)
                    setRefresh(r => r + 1)
                }
            }
            for (let index = 0; index < files.length; index++) {
                currentUser.position && UpdateImage(currentUser.position, "pic", files[index])
            }
        }
    }, [currentAlert, currentUser, isUpload, files])
    useEffect(() => {
        isCopyLink && navigator.clipboard.writeText(process.env.ftp_url + "locand/" + items[i].name);
        isCopyLink && store.dispatch(setNotice({ open: true, success: false, msg: "copied" }))
        setTimeout(() => {
            store.dispatch(setNotice({ open: false, success: false, msg: "" }))
        }, 3000)
    }, [isCopyLink])
    useEffect(() => {
        setRefresh(n => n + 1)
    }, [currentModal.value])
    return (
        <div className='w-full'>
            <div className="grid grid-cols-12 gap-4">
                <div className=' relative col-span-4 md:col-span-3 lg:col-span-2  aspect-square overflow-hidden rounded flex flex-col justify-center text-center cursor-pointer shadow-lg  bg-white dark:bg-slate-800'>
                    {loadingButton ? "LOADING..." :
                        <UploadButton name="ADD IMAGE" func={(e) => { getFile(e), setFile(undefined), setFiles(undefined) }} />}
                </div>
                {
                    items.map((item, index) =>
                        <div key={index} className='col-span-4 md:col-span-3 lg:col-span-2 relative aspect-square sm overflow-hidden rounded cursor-pointer bg-white dark:bg-slate-800' onClick={() => store.dispatch(setModal({ value: "viewimage_detail", data: item }))}>
                            <Image className='' quality={100} src={process.env.ftp_url + item.name} alt='pic' fill sizes='100%' priority style={{ objectFit: "cover" }} />
                        </div>
                    )
                }
            </div>
            {/* {edit &&
                <div className='pd-5px br-5px mg-10px-0px h-1/6'>
                    <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={isEnd} />
                </div>} */}
        </div>
    )
}
