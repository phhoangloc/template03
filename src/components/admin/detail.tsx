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

    const [_saving, set_saving] = useState<boolean>(false)

    const body = {
        name: _name,
        slug: _slug,
        coverId: _coverId,
        content: _newContent || _content
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

    return (
        <div className='flex flex-wrap gap-4 '>
            <div className='w-full bg-white dark:bg-slate-800 shadow-md rounded h-12 flex flex-col justify-center px-2'>
                <div className='flex'>
                    <p onClick={() => toPage.push(`/admin/`)} className="hover:text-orange-500 cursor-pointer" >admin</p>
                    <p className="px-1"> / </p>
                    <p onClick={() => toPage.push(`/admin/${path1}/`)} className="hover:text-orange-500 cursor-pointer" >{path1}</p>
                </div>
            </div>
            <div className='w-full bg-white dark:bg-slate-800 shadow-md rounded flex flex-col justify-center px-2'>
                <div className='flex h-12 justify-between'>
                    {path2 === "news" ? <p className='flex flex-col justify-center'>add new {path1}</p> : <p className='flex flex-col justify-center'>edit blog</p>}
                    <div className="flex gap-1">
                        <Button name="cancel" onClick={() => toPage.back()} sx="!m-auto !w-24 !h-6  !text-sm" />
                        <Button name={path2 === "news" ? "create" : "save"} onClick={() => path2 === "news" ? createNewItem(currentUser.position, path1, body) : updateAnItem(currentUser.position, path1, _id, body)} sx="!m-0 !m-auto !w-24 !h-6  !text-sm" />
                    </div>
                </div>
            </div>
            <div className='w-full h-max bg-white dark:bg-slate-800 shadow-md rounded p-1'>
                <EditPicture src={_coverName ? process.env.ftp_url + _coverName : undefined} setPictureModal={() => { store.dispatch(setModal({ value: "viewimage" })), set_isCoverId(true) }} />
            </div>
            <div className='w-full grid h-max bg-white dark:bg-slate-800 shadow-md rounded p-2 gap-2'>

                <Input name="title" onChange={(v) => set_name(v)} value={_name} />
                <Input name="slug" onChange={(v) => set_slug(v)} value={_slug} />
                <TextAreaTool value={_content} onChange={(v) => set_newContent(v)} />
            </div >
        </div>

    )
}
// export const EditDetailById = ({ path1, path2 }: Props) => {

//     const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

//     const update = () => {
//         store.subscribe(() => setCurrentUser(store.getState().user))
//     }
//     useEffect(() => {
//         update()
//     })


//     const [username, setUserName] = useState<string>("")
//     const [email, setEmail] = useState<string>("")
//     const [cover, setCover] = useState<any>()
//     const [coverId, setCoverId] = useState<string>("")
//     const [avata, setAvata] = useState<any>()
//     const [avataId, setAvataId] = useState<string>("")
//     const [position, setPosition] = useState<string>("")
//     const [active, setActive] = useState<boolean>(true)


//     const [modalOpen, setModalOpen] = useState<boolean>(false)
//     const [IsAddExp, setIsAddExp] = useState<boolean>(false)

//     const [isUpdateCover, setIsUpdateCover] = useState<boolean>(false)
//     const [isUpdateAvata, setIsUpdateAvata] = useState<boolean>(false)

//     const body = {
//         coverId: (coverId),
//         avataId: avataId,
//         username,
//         position,
//         active
//     }

//     const getProfileById = async (id: string) => {
//         const result = await ApiItemUser({ position: currentUser.position, archive: path1, id: id })

//         if (result.success) {

//             setUserName(result.data?.[0]?.username)
//             setEmail(result.data?.[0]?.email)
//             setCoverId(result.data?.[0]?.coverId)
//             setAvataId(result.data?.[0]?.avataId)
//             setPosition(result.data?.[0]?.position)
//             setActive(result.data?.[0]?.active)
//         } else {
//             setUserName("")
//             setEmail("")
//             setCoverId("")
//             setAvataId("")
//             setPosition("")
//         }
//     }
//     useEffect(() => {
//         path1 && getProfileById(path2)
//     }, [path2])

//     const updateProfile = async (id: string, body: any) => {
//         const result = await ApiUpdateItem({ position: currentUser.position, archive: "user", id }, body)
//         if (result.success) {
//             store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
//             store.dispatch(setRefresh())
//             setTimeout(() => {
//                 store.dispatch(setNotice({ success: false, msg: "", open: false }))
//             }, 3000)
//         } else {
//             store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
//             setTimeout(() => {
//                 store.dispatch(setNotice({ success: false, msg: "", open: false }))
//             }, 3000)
//         }
//     }

//     const getPictureCover = async (id: string) => {
//         const result = await ApiItem({ archive: "pic", id: id })
//         if (result) {
//             setCover(result.data[0])
//         }
//     }
//     const getPictureAvata = async (id: string) => {
//         const result = await ApiItem({ archive: "pic", id: id })
//         if (result) {
//             setAvata(result.data[0])
//         }
//     }

//     useEffect(() => {
//         coverId && getPictureCover(coverId)
//         avataId && getPictureAvata(avataId)
//     }, [avataId, coverId])

//     const sendMailToChangeEmail = async (email: string) => {
//         const result = await ApiChangeMail({ position: currentUser.position }, { email: email })
//         console.log(result)
//         if (result.success) {
//             store.dispatch(setNotice({ open: true, msg: result.msg, success: result.success }))
//             setTimeout(() => {
//                 store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
//             }, 3000)

//         } else {
//             store.dispatch(setNotice({ open: true, msg: result.msg, success: result.success }))
//             setTimeout(() => {
//                 store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
//             }, 3000)
//         }
//     }
//     const sendMailToChangePassword = async (email: string) => {
//         const result = await ApiChangePasword({ position: currentUser.position }, { email: email })
//         if (result.success) {
//             store.dispatch(setNotice({ open: true, msg: result.msg, success: result.success }))
//             setTimeout(() => {
//                 store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
//             }, 3000)
//         } else {
//             store.dispatch(setNotice({ open: true, msg: result.msg, success: result.success }))
//             setTimeout(() => {
//                 store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
//             }, 3000)
//         }
//     }

//     return (
//         <div className="">
//             <ImageModal modalOpen={modalOpen} onCanel={() => setModalOpen(false)} onSubmit={(id) => {
//                 isUpdateAvata && setAvataId(id)
//                 isUpdateCover && setCoverId(id)
//                 setModalOpen(false)
//             }} />
//             <div className='pt-5'>
//                 <div className="mb-5">
//                     <EditPicture src={cover?.name ? process.env.ftp_url + cover?.name : undefined} setPictureModal={() => { setModalOpen(true), setIsUpdateCover(true), setIsUpdateAvata(false) }} />
//                 </div>
//                 <div className="w-full mt-[-10%]">
//                     <EditAvatar src={avata?.name ? process.env.ftp_url + avata?.name : undefined} setPictureModal={() => { setModalOpen(true), setIsUpdateCover(false), setIsUpdateAvata(true) }} />
//                 </div>
//                 <div className="w-max m-auto py-10 text-center">
//                     <h2 className='font-bold text-xl mb-1'>{username}</h2>
//                     <h3 className='font-bold text-lg mb-1 opacity-75'>{position}</h3>
//                 </div>
//                 <Input sx='bg-white dark:bg-slate-800 shadow' name="username" onChange={(v) => setUserName(v)} value={username} />
//                 <div className='mb-1'>change your email</div>
//                 <div className="flex ">
//                     <Input name="current email" sx='bg-white dark:bg-slate-800 shadow !w-full' onChange={(v) => setEmail(v)} value={email} disabled={true} />
//                     <Button onClick={() => sendMailToChangeEmail(email)} name="send" sx="!my-0 !ml-1" />
//                 </div>
//                 <div className='mb-1'>reset your password</div>
//                 <div className="flex">
//                     <Input name="current email" sx='bg-white dark:bg-slate-800 shadow !w-full' onChange={(v) => setEmail(v)} value={email} disabled={true} />
//                     <Button onClick={() => sendMailToChangePassword(email)} name="send" sx="!my-0 !ml-1" />
//                 </div>
//                 {currentUser.position === "admin" && <div className='mb-1'>position</div>}
//                 {currentUser.position === "admin" && <div className="flex">
//                     <Select data={
//                         [{
//                             title: "admin",
//                             func: (v) => setPosition(v)
//                         },
//                         {
//                             title: "user",
//                             func: (v) => setPosition(v)
//                         },]
//                     }
//                         title={position}
//                         sx="!w-24"
//                     />
//                 </div>}
//                 {currentUser.position === "admin" && <div className='mb-1'>active</div>}
//                 {currentUser.position === "admin" && <div className="flex">
//                     <Select data={
//                         [{
//                             title: "true",
//                             func: (v) => setActive(true)
//                         },
//                         {
//                             title: "false",
//                             func: (v) => setActive(false)
//                         },]
//                     }
//                         title={active.toString()}
//                         sx="!w-24"
//                     />
//                 </div>}
//             </div>
//             <div className=''>
//                 <Button onClick={() => updateProfile(path2, body)} name="save" sx="bg-main mg-5px-0px" />
//             </div>
//         </div>

//     )
// }