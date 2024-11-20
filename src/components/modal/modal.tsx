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
import { ApiItemUser } from '@/api/user'
import { ApiUploadFile } from '@/api/user'
import UploadButton from '../button/uploadButton'
import CloseIcon from '@mui/icons-material/Close';
type ImageProps = {
  data: any
}
const ImageModalDetail = ({ data }: ImageProps) => {

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
    isCopyLink && navigator.clipboard.writeText(process.env.ftp_url + data.name);
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
          store.dispatch(setModal({ value: "", data: {} }))
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
    <div className="w-full max-w-[992px] h-max m-auto p-4 grid grid-cols-1 lg:grid-cols-2  bg-slate-50 dark:bg-slate-800 dark:text-white">
      <div className="relative rounded overflow-hidden m-auto lg:h-max max-w-80">
        <Image quality={100} src={process.env.ftp_url + data.name} width={500} height={500} alt="" priority style={{ width: "100%", height: "auto", margin: "auto" }} />
      </div>
      <div className="relative ">
        <Input name="name" value={data.name} onChange={() => { }} disabled={true} />
        <Input name="author" value={data.host.username} onChange={() => { }} disabled={true} />
        <Input name="url" value={process.env.ftp_url + data.name} onChange={() => { }} disabled={true}
          icon1={<ContentCopyIcon className='!w-10 !h-10 p-2 m-auto bg-white hover:text-orange-500 cursor-pointer rounded-[50%]' onClick={() => setIsCopyLink(true)} />} />
        <div className='flex justify-between w-full mt-6'>
          <DeleteOutlineOutlinedIcon className='dark:text-white hover:text-orange-500 cursor-pointer' onClick={() => deleteImage(data.id)} />
          <p className=' dark:text-white hover:text-orange-500 cursor-pointer' onClick={() => store.dispatch(setModal({ value: "", data: {} }))} >close</p>
        </div>
      </div>
    </div>
  )
}
const ImageModal = () => {
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
  const [limit, setLimit] = useState<number>(24)

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
    <div className='w-full dark:text-white'>
      <div className="grid grid-cols-12 gap-2">
        <div className=' relative col-span-3 md:col-span-2 xl:col-span-1   aspect-square overflow-hidden rounded flex flex-col justify-center text-center cursor-pointer shadow-lg  bg-white dark:bg-slate-800 '>
          {loadingButton ? "LOADING..." :
            <UploadButton name="ADD IMAGE" func={(e) => { getFile(e), setFile(undefined), setFiles(undefined) }} />}
        </div>
        {
          items.map((item, index) =>
            <div key={index} className='col-span-3 md:col-span-2 xl:col-span-1 relative aspect-square sm overflow-hidden rounded cursor-pointer bg-white dark:bg-slate-800' onClick={() => store.dispatch(setModal({ value: "", id: item.id }))}>
              <Image className='opacity-90 hover:scale-110 hover:opacity-100 transition-all duration-200 ' quality={100} src={process.env.ftp_url + item.name} alt='pic' fill priority style={{ objectFit: "cover" }} />
            </div>
          )
        }
      </div>
      <div className="flex py-2">
        <CloseIcon className='!w-9 !h-9 p-1 bg-orange-600 rounded cursor-pointer' onClick={() => store.dispatch(setModal({ value: "", id: 0 }))} />
      </div>
      {/* {edit &&
              <div className='pd-5px br-5px mg-10px-0px h-1/6'>
                  <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={isEnd} />
              </div>} */}
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
    case "viewimage_detail":
      return (
        currentModal.data ?
          <div className='fixed w-screen h-screen top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-[11] flex flex-col justify-center p-2'>
            <ImageModalDetail data={currentModal.data} />
          </div> : null
      )
    case "viewimage":
      return (
        <div className='fixed w-screen h-screen top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-[11] overflow-scroll scroll_none p-2'>
          <ImageModal />
        </div>
      )
    default: null
  }

}


