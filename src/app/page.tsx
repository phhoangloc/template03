"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import SendIcon from '@mui/icons-material/Send';
import Image from "next/image";
import { useRouter } from "next/navigation";
import Feeds from "@/component/feeds";
import SaveIcon from '@mui/icons-material/Save';

export default function Home() {
  const [feeds, setFeeds] = useState<any[]>([])
  const [rssname, setRssName] = useState<string>("")
  const [rsslink, setRsslink] = useState<string>("")
  const [rss, setRss] = useState<string>("")
  const [r, setR] = useState<number>(0)
  const [i, setI] = useState<number>(-1)
  const [id, setId] = useState<string>("")
  const [type, setType] = useState<string>("grid")
  const [modal, setModal] = useState<boolean>(false)

  const getFeed = async () => {
    const result = await axios.get(`/api/feed`)
    if (result.data.success) {
      setFeeds(result.data.data)
    } else {
      setFeeds([])
    }
  }

  useEffect(() => {
    getFeed()
  }, [r])

  const toPage = useRouter()

  const saveFeeds = async (rssname: string, rss: string) => {
    const body = {
      feedname: rssname,
      feedlink: rss
    }
    rss && await axios.post("/api/feed", body)
    setR(r + 1)
  }

  const embed = () => {
    setModal(!modal)
  }
  return (
    <main style={{ backgroundColor: "whitesmoke" }}>
      <div className="header" style={{ width: "90%", margin: "0px auto", maxWidth: "992px", textAlign: "center" }}>
        <h1>ASTEM ALERT</h1>
        <div style={{ margin: "0 10px", display: "flex" }}>
          <input placeholder="rss" onChange={(e) => setRsslink(e.target.value)} value={rsslink} style={{ height: "40px", width: "calc(100% - 40px)", padding: 0, margin: 0 }} />
          <SendIcon onClick={() => { setRss(rsslink), setI(-1), setId("") }} style={{ width: "30px", height: "30px", margin: "5px", cursor: "pointer" }} />
        </div>
      </div>
      <div className="grid_box" style={{ width: "90%", margin: "25px auto", maxWidth: "1200px" }}>
        <div className="xs12 sm3"
          style={{ backgroundColor: "white", minHeight: "100px", padding: "5px", border: "1px solid lightgrey", borderRadius: "5px", margin: "10px " }}>
          <h5 style={{ textAlign: "center" }}>キーワード</h5>
          {feeds.length ?
            feeds.map((f: any, i: number) =>
              <div key={i} style={{ fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }} onClick={() => { setRss(""), setI(i), setId(f._id) }}>
                {i + 1}. {f.feedname}
              </div>
            ) : null}

        </div>
        <div className="xs12 sm9"
          style={{ backgroundColor: "white", minHeight: "100px", padding: "5px", border: "1px solid lightgrey", borderRadius: "5px", margin: "10px " }}>
          {rss ?
            <div
              style={{ display: "flex", width: "max-content", cursor: "pointer", border: "1px solid #888", padding: "0px 10px", margin: "5px 0" }}>
              <input className="focusOutlineNone" placeholder="rss" onChange={(e) => setRssName(e.target.value)} value={rssname} style={{ height: "30px", width: "150px", padding: 0, margin: 0, border: "none" }} />
              <SaveIcon style={{ width: "20px", height: "20px", margin: "5px", cursor: "pointer" }}
                onClick={() => saveFeeds(rssname, rss)}
              />
              <p style={{ fontSize: "0.8rem", height: "30px", lineHeight: "30px" }}>save</p>
            </div>
            : id ?
              <div>
                <div>
                  <div
                    onClick={() => embed()}
                    style={{ display: "flex", width: "max-content", cursor: "pointer", border: "1px solid #888", padding: "0px 10px", margin: "5px 0" }}>
                    <Image src={"/icon/embed.png"} alt="embed" width={50} height={50} style={{ width: "20px", height: "20px", margin: "5px", cursor: "pointer" }} />
                    <p style={{ fontSize: "0.8rem", height: "30px", lineHeight: "30px" }}>embed</p>
                  </div>
                </div>
                <div style={{ height: modal ? "50px" : "0px", transition: "all 0.1s", overflow: "hidden", border: "1px solid #eee", padding: "0px 10px", borderRadius: "5px" }}>
                  <code>
                    {`<iframe scr="${process.env.HOMEPAGE_URL + id}/ ${type}"></iframe>`}
                  </code>
                </div>
              </div> :
              null}
          <Feeds id={id} rss={rss} type="grid" />
        </div>
      </div>
    </main>
  )
}
