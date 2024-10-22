'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import store from '@/redux/store';
import { ApiDeleteItem, ApiItemUser } from '@/api/user';
import Input from '../input/input';
import Button from '../button/button';
import EditPicture, { EditAvatar } from '../picture/editPicture';
import { ModalType, setModal } from '@/redux/reducer/ModalReducer';
import TextAreaTool from '../input/textareaTool';
import { ApiCreateItem, ApiUpdateItem } from '@/api/user';
import { setNotice } from '@/redux/reducer/noticeReducer';
import moment from 'moment';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import Link from 'next/link';
import { TitleDrop } from '../input/select';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotFound from '../cards/notFound';
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
    const [_refressh, set_refresh] = useState<number>(0)
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

    const [_chapters, set_chapters] = useState<any[]>([])
    const [_chapterIndex, set_chapterIndex] = useState<number>(-1)
    const [_chapterId, set_chapterId] = useState<string>("")
    const [_chapterContent, set_chapterContent] = useState<string>("")
    const [_chapterName, set_chapterName] = useState<string>("")
    const [_isCoverChapterId, set_isCoverChapterId] = useState<boolean>(false)
    const [_coverChapterId, set_coverChapterId] = useState<number>(0)
    const [_coverChapterName, set_coverChapterName] = useState<string>("")
    const [_isChapterUpdate, set_isChapterUpdate] = useState<boolean>(false)

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
            set_chapters(result.data[0].chapters ? result.data[0].chapters : [])
        }
    }
    useEffect(() => {
        currentUser.position && getItems(currentUser.position, path1, path2)
    }, [currentUser.position, _refressh])

    useEffect(() => {
        _isCoverId && currentModal.id && set_coverId(currentModal.id)
        _isCoverChapterId && currentModal.id && set_coverChapterId(currentModal.id)
    }, [currentModal.id])

    const getMedia = async (p: string, id: string) => {
        const result = await ApiItemUser({ position: p, archive: "pic", id })
        if (result.success && result.data[0]) {
            set_coverName(result.data[0].name)
            set_isCoverId(false)
        } else {
            set_isCoverId(false)
            set_coverName("")
        }
    }
    const getCoverChapter = async (p: string, id: string) => {
        const result = await ApiItemUser({ position: p, archive: "pic", id })
        if (result.success && result.data[0]) {
            set_coverChapterName(result.data[0].name)
            set_isCoverChapterId(false)
        } else {
            set_coverName("")
            set_isCoverChapterId(false)
            set_coverName("")
        }
    }
    useEffect(() => {
        currentUser.position && _coverId && getMedia(currentUser.position, _coverId.toString())
        currentUser.position && _coverChapterId && getCoverChapter(currentUser.position, _coverChapterId.toString())
    }, [currentUser.position, _coverId, _coverChapterId])

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
            store.dispatch(setNotice({ success: true, msg: result.msg, open: true }))
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

    const createChapter = async (body: any) => {
        const result = await ApiCreateItem({ position: currentUser.position, archive: "chapter" }, body)
        if (result.success) {
            set_refresh(re => re + 1)
        }
    }
    const updateChapter = async (id: string, body: any) => {
        set_isChapterUpdate(true)
        const result = await ApiUpdateItem({ position: currentUser.position, archive: "chapter", id }, body)
        if (result.success) {
            set_isChapterUpdate(false)
            set_refresh(re => re + 1)
        }
    }
    const deleteChapter = async (id: string) => {
        const result = await ApiDeleteItem({ position: currentUser.position, archive: "chapter", id })
        if (result.success) {
            set_refresh(re => re + 1)
        }
    }

    return (
        _id || path2 === "news" ? <div className='flex flex-wrap gap-4 '>
            <div className='w-full bg-white dark:bg-slate-800 shadow-md rounded h-12 flex flex-col justify-center px-2'>
                <div className='flex'>
                    <p onClick={() => toPage.push(`/admin/`)} className="hover:text-orange-500 cursor-pointer" >admin</p>
                    <p className="px-1"> / </p>
                    <p onClick={() => toPage.push(`/admin/${path1}/`)} className="hover:text-orange-500 cursor-pointer" >{path1}</p>
                </div>
            </div>
            <div className='w-full bg-white dark:bg-slate-800 shadow-md rounded h-12 flex flex-col justify-center px-2'>
                <Link href={"/" + path1 + "/" + path2 + "_preview"} target='__blank'><p className='truncate'>url <span className='hover:underline cursor-pointer opacity-75' onClick={() => previewAnItem(currentUser.position, path1, "1", { name: _name, slug: path2 + "_preview", coverId: _coverId, content: _newContent || _content })}>{"/admin/" + path1 + "/" + (_slug ? _slug : path2)}</span></p></Link>
            </div>
            <div className="w-full flex flex-wrap gap-4 xl:flex-nowrap flex-row-reverse ">
                <div className='w-full xl:w-3/12 bg-white dark:bg-slate-800 shadow-md rounded flex flex-col justify-center px-2 h-max'>
                    <div className='w-full  h-max bg-white dark:bg-slate-800 shadow-md rounded p-1 hidden xl:block'>
                        <EditPicture src={_coverName ? process.env.ftp_url + _coverName : undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverId(true) }} />
                    </div>
                    <div className="flex h-12 gap-1 ml-auto mr-0">
                        <Button name="cancel" onClick={() => toPage.back()} sx="!m-auto !w-24 !h-6  !text-sm" />
                        <Button name={path2 === "news" ? "create" : "save"} onClick={() => path2 === "news" ? createNewItem(currentUser.position, path1, body) : updateAnItem(currentUser.position, path1, _id, body)} sx="!m-0 !m-auto !w-24 !h-6  !text-sm" disable={_saving} />
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
                <div className="w-full grid gap-4 xl:w-9/12">
                    <div className='w-full  h-max bg-white dark:bg-slate-800 shadow-md rounded p-1 xl:hidden'>
                        <EditPicture src={_coverName ? process.env.ftp_url + _coverName : undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverId(true) }} />
                    </div>
                    <div className="relative">
                        <div className='flex'>
                            <p className={`w-24 h-9 flex flex-col justify-center text-center cursor-pointer rounded-t rounded-r ${_chapterIndex === -1 ? "bg-white dark:bg-slate-800 text-orange-600 font-bold" : ""}`} onClick={() => set_chapterIndex(-1)}>infor</p>
                            {path1 === "book" && _id ?
                                <p className={`w-24 h-9 flex flex-col justify-center text-center cursor-pointer rounded-t rounded-r ${_chapterIndex !== -1 ? "bg-white dark:bg-slate-800 text-orange-600 font-bold" : ""}`} onClick={() => set_chapterIndex(-2)}>chapters</p> : null}

                        </div>
                        {_chapterIndex === -1 ?
                            <div className='w-full grid  h-max bg-white dark:bg-slate-800 shadow-md rounded p-2 gap-2'>
                                <Input name="title" onChange={(v) => set_name(v)} value={_name} />
                                <Input name="slug" onChange={(v) => set_slug(v)} value={_slug} />
                                <TextAreaTool value={_content} onChange={(v) => set_newContent(v)} />
                            </div >
                            :
                            _chapters.length ?
                                <div className='w-full grid grid-cols-12 h-max bg-white dark:bg-slate-800 shadow-md rounded p-2 gap-2'>
                                    <div className="flex justify-between h-12 col-span-12">
                                        <p className='h-full flex flex-col justify-center'>CHAPTER</p>
                                        <AddIcon className='!w-12 !h-12 p-3 cursor-pointer' onClick={() => createChapter({ name: "chapter " + (_chapters.length + 1), bookId: _id })} />
                                    </div>
                                    <div className='h-[448px] w-full overflow-auto scroll_none col-span-12 md:col-span-6'>
                                        {_chapters.map((chapter, index) =>
                                            <div key={index}>
                                                <div className='flex justify-between'>
                                                    {
                                                        _chapterIndex === index ? <input
                                                            className={`bg-inherit h-10 p-0 transition-all duration-200 border-2 rounded  border-orange-600 w-full px-4`}
                                                            type="text"
                                                            defaultValue={chapter.name}
                                                            onFocus={(e) => e.target.style.outline = 'none'}
                                                            onChange={(e) => {
                                                                set_chapterName(e.target.value)
                                                            }}
                                                        /> :
                                                            <p className='h-12 flex flex-col justify-center hover:text-orange-600 cursor-pointer' onClick={() => { set_chapterIndex(index), set_chapterId(chapter.id), set_coverChapterId(chapter.coverId), chapter.coverId ? null : set_coverChapterName("") }} >{chapter.name}</p>
                                                    }

                                                    <div className='flex'>
                                                        {_chapterIndex === index ?
                                                            _isChapterUpdate ?
                                                                <RefreshIcon className='!w-12 !h-12 p-3 cursor-pointer hover:text-orange-600' /> :
                                                                <CheckIcon className='!w-12 !h-12 p-3 cursor-pointer hover:text-orange-600' onClick={() => updateChapter(_chapterId, { content: _chapterContent, coverId: _coverChapterId, name: _chapterName || chapter.name })} />
                                                            : null}
                                                        <RemoveIcon className='!w-12 !h-12 p-3 cursor-pointer hover:text-orange-600' onClick={() => deleteChapter(chapter.id)} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-12 md:col-span-6">

                                        {
                                            _coverChapterName ?
                                                <EditPicture src={process.env.ftp_url + _coverChapterName} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverChapterId(true) }} /> :
                                                <EditPicture src={undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverChapterId(true) }} />

                                        }
                                    </div>
                                    <div className="col-span-12">
                                        <TextAreaTool value={_chapters[_chapterIndex]?.content || ""} onChange={(v) => set_chapterContent(v)} />
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div> :
            <div className="flex h-full-12 flex-col justify-center"><NotFound /></div>

    )
}
export const EditDetailbyId = ({ id }: { id: string }) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentModal, setCurrentModal] = useState<ModalType>(store.getState().modal)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentModal(store.getState().modal))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()
    const [_username, set_username] = useState<string>("")
    const [_email, set_email] = useState<string>("")
    const [_active, set_active] = useState<boolean>(true)
    const [_position, set_position] = useState<string>("")
    const [_avataId, set_avataId] = useState<string>("")
    const [_avataName, set_avataName] = useState<string>("")
    const [_coverId, set_coverId] = useState<string>("")
    const [_coverName, set_coverName] = useState<string>("")

    const [_isAvataId, set_isAvataId] = useState<boolean>(false)
    const [_isCoverId, set_isCoverId] = useState<boolean>(false)

    const body = {
        coverId: _coverId || undefined,
        avataId: _avataId || undefined,
        username: _username,
        position: _position,
        active: _active
    }

    const getProfileById = async (id: string) => {
        const result = await ApiItemUser({ position: currentUser.position, archive: "user", id: id })
        if (result.success && result.data.length) {
            set_username(result.data[0].username)
            set_email(result.data[0].email)
            set_active(result.data[0].active)
            set_position(result.data[0].position)
            set_avataId(result.data[0].avataId)
            set_coverId(result.data[0].coverId)
        }
    }
    useEffect(() => {
        getProfileById(id)
    }, [])

    const getImageById = async (type: string, id: string) => {
        const result = await ApiItemUser({ position: currentUser.position, archive: "pic", id: id })
        console.log(result)

        if (result.success && result.data.length) {
            type === "avata" && set_avataName(result.data[0].name)
            type === "cover" && set_coverName(result.data[0].name)
        }
    }
    useEffect(() => {
        getProfileById(id)
    }, [])

    useEffect(() => {
        _avataId && getImageById("avata", _avataId)
        _coverId && getImageById("cover", _coverId)

    }, [_avataId, _coverId])

    useEffect(() => {
        if (_isAvataId && currentModal.id) {
            set_avataId(currentModal.id.toString());
            set_isAvataId(false);
            set_isCoverId(false)
        }
        if (_isCoverId && currentModal.id) {
            set_coverId(currentModal.id.toString());
            set_isCoverId(false);
            set_isAvataId(false)
        }
    }, [currentModal.id])

    const updateProfile = async (id: string, body: any) => {
        const result = await ApiUpdateItem({ position: currentUser.position, archive: "user", id }, body)
        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
            store.dispatch(setRefresh())
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }
    console.log(_avataId)
    return (
        <div className='grid gap-4'>
            <div className="w-full bg-white dark:bg-slate-800 shadow-md rounded">
                <div className="flex h-12 gap-1 ml-auto mr-4 w-max">
                    <Button name="cancel" onClick={() => toPage.back()} sx="!m-auto !w-24 !h-6  !text-sm" />
                    <Button name={"save"} onClick={() => updateProfile(id, body)} sx="!m-0 !m-auto !w-24 !h-6  !text-sm" />
                </div>
            </div>
            <div className="xl:flex gap-4 ">
                <div className='bg-white dark:bg-slate-800 xl:w-3/12 shadow-md rounded'>
                    <EditPicture src={_coverName ? process.env.ftp_url + _coverName : undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverId(true) }} cover={true} />
                    <div className="mt-[-150px] h-max">
                        <EditAvatar src={_avataName ? process.env.ftp_url + _avataName : undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isAvataId(true) }} cover={true} />
                    </div>
                    <div className="w-max m-auto py-10 text-center">
                        <h2 className='font-bold text-xl mb-1'>{_username}</h2>
                        <h3 className='font-bold text-lg mb-1 opacity-75'>{_position}</h3>
                    </div>
                </div>
                <div className='bg-white dark:bg-slate-800 xl:w-9/12 shadow-md rounded'>
                    <div className=' p-4'>
                        <Input name="username" onChange={(v) => set_username(v)} value={_username} />
                        <Input name="email" onChange={(v) => set_username(v)} value={_email} disabled={true} />
                    </div>
                    <div className=' p-4'>
                        {currentUser.position === "admin" &&
                            <div className="flex mb-4">
                                <div className='flex flex-col justify-center w-24 text-center'>position</div>

                                <TitleDrop data={
                                    [{
                                        title: "admin",
                                        func: (v) => set_position(v)
                                    },
                                    {
                                        title: "user",
                                        func: (v) => set_position(v)
                                    },]
                                }
                                    title={_position}
                                    sx="!w-24"
                                />
                            </div>}
                        {currentUser.position === "admin" &&
                            <div className="flex mb-4">
                                <div className='flex flex-col justify-center w-24 text-center'>active</div>
                                <TitleDrop data={
                                    [{
                                        title: "true",
                                        func: (v) => set_active(true)
                                    },
                                    {
                                        title: "false",
                                        func: (v) => set_active(false)
                                    },]
                                }
                                    title={_active.toString()}
                                    sx="!w-24"
                                />
                            </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}