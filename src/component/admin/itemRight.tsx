import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@mui/icons-material';
type Props = {
    archive: string
}

const ItemRight = ({ archive }: Props) => {

    const [items, setItems] = useState<any>()

    const getItem = async (a: string) => {
        switch (a) {
            case "watch":
            case "user":
                const result = await axios.get(process.env.server_url + `admin/${a}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage && localStorage.token
                    },
                })

                if (result.data.success) {
                    setItems(result.data.data)
                }
        }
    }

    useEffect(() => {
        getItem(archive)
    }, [])

    const toPage = useRouter()

    return (
        <div className='item_right'>
            {
                items && items.length ?
                    items.map((item: any, index: string) =>
                        <div className='item' key={index}
                            onClick={() => toPage.push("/admin/" + archive + "/" + item._id)}>
                            <p>{item.username || item.name}</p>
                            <div className="icon" >
                                <DeleteIcon />
                            </div>
                        </div>)
                    : null
            }
        </div>
    )
}

export default ItemRight