'use client'
import React, { useEffect, useState } from 'react'
import Input from '../items/input'
import TextArea from '../items/textarea'
import Button from '../items/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Props = {
    archive: string,
    slug: string
}

const EditUser = ({ archive, slug }: Props) => {

    const [currentslug, setCurrentSlug] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const toPage = useRouter()

    const save = async (data: any, slug: string) => {
        const body = {
            slug: data.currentslug,
            name: data.name,
            brand: data.brand,
            price: data.price,
            detail: data.detail,
        }
        const result = await axios.put(process.env.server_url + `admin/${archive}?id=${slug}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        if (result.data.success) {
            toPage.push("/admin/watch/")
        }

    }

    const getItem = async (slug: string) => {
        if (slug !== "new_") {
            const result = await axios.get(process.env.server_url + "admin/" + archive + "?id=" + slug, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })

            if (result.data.success) {
                setCurrentSlug(result.data.data[0].slug)
                setUsername(result.data.data[0].username)
            }
        }
    }

    useEffect(() => {
        getItem(slug)
    }, [slug])

    return (
        <div className="edit_item">
            <h2>create watch</h2>
            <Input name="username" value={username} onChange={v => setUsername(v)} />
        </div>
    )
}

export default EditUser