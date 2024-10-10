'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import Image from 'next/image'
import Input from '../input/input'
import Button from '../button/button'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ModalType, setModal } from '@/redux/reducer/ModalReducer'
import { setNotice } from '@/redux/reducer/noticeReducer'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
import { ApiDeleteItem } from '@/api/user'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
type ImageProps = {
  data: any
}
export const ImageModal = ({ data }: ImageProps) => {

  const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
  const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

  const update = () => {
    store.subscribe(() => setCurrentUser(store.getState().user))
    store.subscribe(() => setCurrentAlert(store.getState().alert))
  }
  useEffect(() => {
    update()
  })

  const [isCopyLink, setIsCopyLink] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)

  useEffect(() => {
    isCopyLink && navigator.clipboard.writeText(process.env.ftp_url + "locand/" + data.name);
    isCopyLink && store.dispatch(setNotice({ open: true, success: false, msg: "copied" }))
    setTimeout(() => {
      store.dispatch(setNotice({ open: false, success: false, msg: "" }))
    }, 3000)
  }, [isCopyLink])


  const deleteImage = async (id: string) => {
    store.dispatch(setAlert({ value: false, msg: "do you want to delete this picture", open: true }))
    setIsDelete(true)
  }

  useEffect(() => {
    const deleteImage = async (p: string, a: string, id: string) => {
      const result = await ApiDeleteItem({ position: p, archive: a, id: id })
      if (result.success) {
        setIsDelete(false)
        store.dispatch(setNotice({ open: true, success: false, msg: result.msg }))
        setTimeout(() => {
          store.dispatch(setNotice({ open: false, success: false, msg: "" }))
          store.dispatch(setModal({ open: false, value: "", msg: "", data: {} }))
        }, 3000)
      } else {
        store.dispatch(setNotice({ open: true, success: false, msg: result.msg }))
        setTimeout(() => {
          store.dispatch(setNotice({ open: false, success: false, msg: "" }))
        }, 3000)
      }
    }
    if (currentAlert.value && isDelete) {

      currentUser.position && data.id && deleteImage(currentUser.position, data.archive, data.id)
    }
  }, [currentAlert, currentUser, isDelete])

  return (
    <div className="w-full max-w-[992px] h-max m-auto p-4 grid grid-cols-1 lg:grid-cols-2  bg-slate-50 dark:bg-slate-800">
      <div className="relative rounded overflow-hidden m-auto lg:h-max max-w-80">
        <Image quality={100} src={process.env.ftp_url + data.name} width={500} height={500} alt="" priority style={{ width: "100%", height: "auto", margin: "auto" }} />
      </div>
      <div className="relative ">
        <Input name="name" value={data.name} onChange={() => { }} disabled={true} />
        <Input name="author" value={data.host.username} onChange={() => { }} disabled={true} />
        <Input name="url" value={process.env.ftp_url + "template2/" + data.name} onChange={() => { }} disabled={true}
          icon1={<ContentCopyIcon className='!w-11 !h-11 p-3 m-auto bg-white hover:text-orange-500 cursor-pointer roud' onClick={() => setIsCopyLink(true)} />} />
        <div className='flex justify-between w-full mt-6'>
          <DeleteOutlineOutlinedIcon className='dark:text-white hover:text-orange-500 cursor-pointer' onClick={() => deleteImage(data.id)} />
          <p className=' dark:text-white hover:text-orange-500 cursor-pointer' onClick={() => store.dispatch(setModal({ open: false, value: "", msg: "", data: {} }))} >close</p>
        </div>
      </div>
    </div>
  )
}

export const Modal = () => {
  const [currentModal, setCurrentModal] = useState<ModalType>(store.getState().modal)
  const update = () => {
    store.subscribe(() => setCurrentModal(store.getState().modal))
  }
  useEffect(() => {
    update()
  })

  switch (currentModal.value) {
    case "viewimage":
      return (
        currentModal.data ?
          <div className='fixed w-screen h-screen top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-[19] flex flex-col justify-center p-2'>
            <ImageModal data={currentModal.data} />
          </div> : null
      )
    default: null
  }

}


