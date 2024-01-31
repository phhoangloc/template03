import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import PreviewIcon from '@mui/icons-material/Preview';
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

    const deleteItem = (id: string) => {
        console.log(id)
    }


    return (
        <div className='item_right'>
            {
                items && items.length ?
                    items.map((item: any, index: string) =>
                        <div className='item' key={index}
                            onClick={() => toPage.push("/admin/" + archive + "/" + item._id)}>
                            <p>{item.username || item.name}</p>
                            <div className="icon" >
                                <a href={"/home/" + archive + "/" + item.slug} target='_blank'><PreviewIcon /></a>
                                <DeleteIcon onClick={() => deleteItem(item._id)} />
                            </div>
                        </div>)
                    : null
            }
        </div>
    )
}

export default ItemRight