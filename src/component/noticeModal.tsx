import React from 'react'
import store from '@/redux/store'
import { useState } from 'react'
import { NoticeType } from "../redux/reducer/noticeReducer"
const NoticeModal = () => {

    const [notice, setCurrentNotice] = useState<NoticeType>(store.getState().notice)

    const update = () => {
        store.subscribe(() => setCurrentNotice(store.getState().notice))
    }

    update()

    return (
        <div style={notice.success ? { backgroundColor: "blue" } : { backgroundColor: "red" }} className={`notice ${notice.open ? "notice_open" : ""}`}>{notice.msg}</div>
    )
}

export default NoticeModal