'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import store from '@/redux/store';
import { ApiItemUser } from '@/api/user';
import Input from '../input/input';
import Button from '../button/button';
import EditPicture from '../picture/editPicture';
import { ModalType, setModal } from '@/redux/reducer/ModalReducer';
import TextAreaTool from '../input/textareaTool';
import { ApiCreateItem, ApiUpdateItem } from '@/api/user';
import { setNotice } from '@/redux/reducer/noticeReducer';
import moment from 'moment';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import Link from 'next/link';
import { ApiItem } from '@/api/client';
import { TitleDrop } from '../input/select';
type Props = {
    path1: string,
    path2: string
}
export type ExpriencesType = {
    position: String,
    department: String,
    worktype: String,
    company: String
    place: String
    fromtime?: Date
    totime?: Date
}
export const EditDetailbySlug = ({ path1, path2 }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentModal, setCurrentModal] = useState<ModalType>(store.getState().modal)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentModal(store.getState().modal))
    }

    useEffect(() => {
        update()
    })
    const [_id, set_id] = useState<string>("")
    const [_isCoverId, set_isCoverId] = useState<boolean>(false)
    const [_coverId, set_coverId] = useState<number>(0)
    const [_coverName, set_coverName] = useState<string>("")
    const [_name, set_name] = useState<string>("")
    const [_slug, set_slug] = useState<string>("")
    const [_content, set_content] = useState<string>("")
    const [_newContent, set_newContent] = useState<string>("")
    const [_createdDate, set_createdDate] = useState<Date>()
    const [_updateDate, set_updateDate] = useState<Date>()

    const [_saving, set_saving] = useState<boolean>(false)

    const body = {
        name: _name,
        slug: _slug,
        coverId: _coverId,
        content: _newContent || _content,
    }

    const toPage = useRouter()

    const getItems = async (p: string, a: string, s: string) => {
        const result = await ApiItemUser({ position: p, archive: a, slug: s })
        if (result.success && result.data[0]) {
            set_id(result.data[0].id)
            set_name(result.data[0].name)
            set_slug(result.data[0].slug)
            set_coverId(result.data[0].coverId)
            set_content(result.data[0].content)
            set_createdDate(result.data[0].createdAt)
            set_updateDate(result.data[0].updateDate)
        }
    }
    useEffect(() => {
        currentUser.position && getItems(currentUser.position, path1, path2)
    }, [currentUser.position])

    useEffect(() => {
        _isCoverId && currentModal.id && set_coverId(currentModal.id)
    }, [_isCoverId, currentModal.id])

    const getMedia = async (p: string, id: string) => {
        const result = await ApiItemUser({ position: p, archive: "pic", id })
        if (result.success && result.data[0]) {
            set_coverName(result.data[0].name)
            set_isCoverId(false)
        } else {
            set_coverName("")
        }
    }

    useEffect(() => {
        currentUser.position && _coverId && getMedia(currentUser.position, _coverId.toString())
    }, [currentUser.position, _coverId])

    const createNewItem = async (p: string, g: string, body: any) => {
        if (body.name && body.slug) {
            const result = await ApiCreateItem({ position: p, archive: g }, body)
            set_saving(true)
            if (result.success) {
                store.dispatch(setNotice({ success: false, msg: result.msg, open: true }))
                setTimeout(() => {
                    set_saving(false)
                    store.dispatch(setNotice({ success: false, msg: "", open: false }))
                    toPage.push("/admin/" + g)
                }, 3000)
            } else {
                store.dispatch(setNotice({ success: false, msg: result.msg, open: true }))
            }
        } else {
            store.dispatch(setNotice({ success: false, msg: "you must input title and slug", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }
    const updateAnItem = async (p: string, g: string, id: string, body: any) => {
        set_saving(true)
        const result = await ApiUpdateItem({ position: p, archive: g, id: id }, body)
        if (result.success) {
            store.dispatch(setNotice({ success: false, msg: result.msg, open: true }))
            setTimeout(() => {
                set_saving(false)
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
                toPage.push("/admin/" + g)
            }, 3000)
        } else {
            store.dispatch(setNotice({ success: false, msg: result.msg, open: true }))
            setTimeout(() => {
                set_saving(false)
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }

    const previewAnItem = async (p: string, g: string, id: string, body: any) => {
        await ApiUpdateItem({ position: p, archive: g, id: id }, body)
    }

    return (
        <div className='flex flex-wrap gap-4 '>
            <div className='w-full bg-white dark:bg-slate-800 shadow-md rounded h-12 flex flex-col justify-center px-2'>
                <div className='flex'>
                    <p onClick={() => toPage.push(`/admin/`)} className="hover:text-orange-500 cursor-pointer" >admin</p>
                    <p className="px-1"> / </p>
                    <p onClick={() => toPage.push(`/admin/${path1}/`)} className="hover:text-orange-500 cursor-pointer" >{path1}</p>
                </div>
            </div>
            <div className='w-full bg-white dark:bg-slate-800 shadow-md rounded h-12 flex flex-col justify-center px-2'>
                <Link href={"/" + path1 + "/blog_preview"} target='__blank'><p>url <span className='hover:underline cursor-pointer opacity-75' onClick={() => previewAnItem(currentUser.position, path1, "1", { name: _name, coverId: _coverId, content: _newContent || _content })}>{"/admin/" + path1 + "/" + (_slug ? _slug : path2)}</span></p></Link>
            </div>
            <div className="w-full flex flex-wrap gap-4 xl:flex-nowrap flex-row-reverse ">
                <div className='w-full xl:w-4/12 bg-white dark:bg-slate-800 shadow-md rounded flex flex-col justify-center px-2 h-max'>
                    <div className="flex h-12 gap-1 ml-auto mr-0">
                        <Button name="cancel" onClick={() => toPage.back()} sx="!m-auto !w-24 !h-6  !text-sm" />
                        <Button name={path2 === "news" ? "create" : "save"} onClick={() => path2 === "news" ? createNewItem(currentUser.position, path1, body) : updateAnItem(currentUser.position, path1, _id, body)} sx="!m-0 !m-auto !w-24 !h-6  !text-sm" />
                    </div>
                    {_createdDate ?
                        <div className='flex flex-wrap max-w-sm ml-auto gap-1 h-6 flex-col justify-center'>
                            <p className='opacity-50'>Created Date :</p>
                            <p >{moment(_createdDate).format("YYYY/MM/DD")}</p>
                        </div> : null}
                    {_updateDate ? <div className='flex flex-wrap max-w-sm ml-auto gap-1 h-6 flex-col justify-center'>
                        <p className='opacity-50'>Update Date :</p>
                        <p >{moment(_updateDate).format("YYYY/MM/DD")}</p>
                    </div> : null}
                </div>
                <div className="w-full grid gap-4 xl:w-8/12">

                    <div className='w-full  h-max bg-white dark:bg-slate-800 shadow-md rounded p-1'>
                        <EditPicture src={_coverName ? process.env.ftp_url + _coverName : undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverId(true) }} />
                    </div>
                    <div className='w-full grid h-max bg-white dark:bg-slate-800 shadow-md rounded p-2 gap-2'>
                        <Input name="title" onChange={(v) => set_name(v)} value={_name} />
                        <Input name="slug" onChange={(v) => set_slug(v)} value={_slug} />
                        <TextAreaTool value={_content} onChange={(v) => set_newContent(v)} />
                    </div >
                </div>
            </div>


        </div>

    )
}