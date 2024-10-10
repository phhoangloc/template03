'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'

const NoticeModal = () => {
  const [currentNotice, setCurrentNotice] = useState<any>(store.getState().notice)
  const update = () => {
    store.subscribe(() => setCurrentNotice(store.getState().notice))
  }
  useEffect(() => {
    update()
  })

  return (
    <div className={`w-full transition-all delay-500  text-center overflow-hidden flex flex-col justify-center absolute text-white bg-sky-500 ${currentNotice.open ? "h-6" : "h-0"} z-30`}>
      <p className='font-bold text-sm'>{currentNotice.msg}</p>
    </div>
  )
}

export default NoticeModal