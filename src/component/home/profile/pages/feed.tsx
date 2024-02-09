'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import TextArea from '@/component/items/textarea'
import Button from '@/component/items/button';
import axios from 'axios';
import Image from 'next/image';

const Feed = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const [feeds, setFeeds] = useState<any[]>([])
    const [myfeeds, setMyFeeds] = useState<any[]>([])
    const [feed, setFeed] = useState<string>("")
    const [number, setNumber] = useState<number>(0)
    const [select, setSelect] = useState<number>(0)

    const getMyPost = async () => {
        const result = await axios.get(process.env.server_url + "myuser/post?author=" + currentUser._id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        if (result.data.success) {
            setMyFeeds(result.data.data)
        }
    }

    const getAllPost = async () => {
        const result = await axios.get(process.env.server_url + "myuser/post", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        if (result.data.success) {
            setFeeds(result.data.data)
        }
    }

    useEffect(() => {
        getMyPost()
    }, [number, select])

    useEffect(() => {
        getAllPost()
    }, [number, select])

    const createFeed = async (f: string) => {
        const result = await axios.post(process.env.server_url + "myuser/post", { detail: f }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        if (result.data.success) {
            setNumber(pre => pre + 1)
            setFeed("")
        }
    }

    return (
        <div className={`feed`}>
            <div className={`new_feed ${currentTheme ? "main_light" : "main_dark"}`}>
                <TextArea name='new feed' value={feed} onChange={(e) => setFeed(e)} />
                <div className="tool">
                    <Button name="post" onClick={() => createFeed(feed)}></Button>
                </div>
            </div>

            <div className="feed_option">
                <p className={`${select === 0 ? "pSelect" : ""} ${currentTheme ? "main_light" : "main_dark"}`} onClick={() => setSelect(0)}>my feed</p>
                <p className={`${select === 1 ? "pSelect" : ""} ${currentTheme ? "main_light" : "main_dark"}`} onClick={() => setSelect(1)}>friend 's feed</p>
            </div>
            <div className="item_feeds">
                {
                    select === 0 ? myfeeds.map((item, index) =>
                        <div className={`item_feed ${currentTheme ? "main_light" : "main_dark"}`} key={index}>
                            <div className="item_feed_header">
                                {item.author?.infor?.avata[0]?.name ?
                                    <Image src={process.env.google_url + item.author?.infor?.avata[0]?.name} height={25} width={25} alt='avt' /> :
                                    null}
                                {item.author?.username}
                            </div>
                            <div className="item_feed_detail">
                                {item.detail}
                            </div>
                        </div>
                    ) : null
                }
                {
                    select === 1 ? feeds.map((item, index) =>
                        <div className={`item_feed ${currentTheme ? "main_light" : "main_dark"}`} key={index}>
                            <div className="item_feed_header">
                                {item.author?.infor?.avata[0]?.name ?
                                    <Image src={process.env.google_url + item.author?.infor?.avata[0]?.name} height={25} width={25} alt='avt' /> :
                                    null}
                                {item.author?.username}
                            </div>
                            <div className="item_feed_detail">
                                {item.detail}
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Feed