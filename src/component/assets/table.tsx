import React from 'react'

type Props = {
    datas: any[]
}

const Table = ({ datas }: Props) => {

    return (
        <table className='table'>
            <tbody>
                {datas && datas.map((arr, index) =>
                    <tr key={index}><td><p>{arr[0]}</p></td><td><p>{arr[1].toString()}</p></td></tr>
                )}
            </tbody>
        </table>
    )
}

export default Table