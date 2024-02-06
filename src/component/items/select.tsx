import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../style/style.css'
type Props = {
    name: string,
    options: string[],
    onChange: (e: any) => void
}

const Select = ({ name, options, onChange }: Props) => {
    const [value, setValue] = useState<string>("")
    const [optionOn, setOptionOn] = useState<boolean>(false)

    useEffect(() => {
        onChange(value)
    }, [value])

    return (
        <div className={`select ${optionOn ? "select_on" : ""}`} >
            <div className='select_value'>
                <p className={`name ${value.length ? "name_up" : ""}`}>{name}</p>
                <p className='value'>{value}</p>
                <KeyboardArrowDownIcon onClick={() => setOptionOn(!optionOn)} />
            </div>
            <div className={`select_option ${optionOn ? "select_option_on" : ""}`}>
                <div className='select_option_item' onClick={() => { setValue(""), setOptionOn(false) }}>{name}</div>
                {options.map((opt, index) =>
                    <div className='select_option_item' key={index} onClick={() => { setValue(opt), setOptionOn(false) }}>{opt}</div>)}
            </div>
        </div>
    )
}

export default Select