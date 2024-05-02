import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
type Props = {
    id?: string,
    type?: string,
    rss: string
}

const Feeds = ({ id, rss, type }: Props) => {
    const [feedlink, setFeedlink] = useState<string>("")
    const getFeedById = async (id: string) => {
        const result = await axios.get("/api/feed?id=" + id)
        if (result.data.success) {
            setFeedlink(result.data.data[0].feedlink)
        }
    }

    useEffect(() => {
        id && getFeedById(id) || setFeedlink("")
    }, [id])

    const [data, setData] = useState<any[]>([])

    const getData = async (rss: string) => {
        const result = await axios.get(`/api/scrape?rss=${rss}`)
        result.data === 'error!' ? setData([]) : setData(result.data)
    }

    useEffect(() => {
        feedlink ? getData(feedlink) : getData(rss)
    }, [feedlink, rss])

    switch (type) {
        case "grid":
            return (
                <div className='grid_box'>
                    {data.length ?
                        data.map((d: any, i: number) =>
                            <div className="xs12 sm6 md4" key={i} style={{ margin: " 10px", padding: "5px", boxShadow: "0px 0px 2px #888", borderRadius: "5px" }} >
                                <Link href={d.link} target="_blank" style={{ color: "inherit", opacity: 0.75, textDecoration: "none" }}>
                                    <div className="title" dangerouslySetInnerHTML={{ __html: d.title }}
                                        style={{ width: "80%", fontWeight: "bold", fontSize: "1.1rem", textWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} />
                                </Link>
                                <div className="content" dangerouslySetInnerHTML={{ __html: d.content }} style={{ margin: "20px 0", overflow: "hidden" }} />
                            </div>
                        ) : null}
                </div>
            )
    }
    return (
        <div>
            {data?.length ?
                data.map((d: any, i: number) =>
                    <div className="box" key={i} style={{ width: "90%", margin: "25px auto", maxWidth: "768px" }} >
                        <Link href={d.link} target="_blank" style={{ color: "inherit", opacity: 0.75, textDecoration: "none" }}>
                            <div className="title" dangerouslySetInnerHTML={{ __html: d.title }}
                                style={{ width: "80%", fontWeight: "bold", fontSize: "1.1rem", textWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} />
                        </Link>
                        <div className="content" dangerouslySetInnerHTML={{ __html: d.content }} style={{ margin: "20px 0", overflow: "hidden" }} />
                    </div>
                ) : null}</div>
    )
}

export default Feeds