import React from 'react'
import store from '@/redux/store'
import { useState } from 'react'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
import Button from './items/button'

const AlertModal = () => {

    const [alert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }

    update()

    return (
        <div style={{ backgroundColor: "green" }} className={`alert ${alert.open ? "alert_open" : ""}`}>
            {alert.msg}
            <div className="box">
                <Button name='yes' onClick={() => store.dispatch(setAlert({ value: true, open: false, msg: "" }))} />
                <Button name='no' onClick={() => store.dispatch(setAlert({ value: false, open: false, msg: "" }))} />
            </div>
        </div>
    )
}

export default AlertModal