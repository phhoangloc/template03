'use client'
import Cover from "@/component/cover";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const list = [
    {
      file: "video/casio.mp4",
    },
    {
      file: "video/rolex.mp4",
    },
    {
      file: "video/orient.mp4",
    },
    {
      file: "video/citizen.mp4",
    },
    {
      file: "video/ck.mp4",
    },
  ]

  const [items, setItems] = useState<any>([])
  const getItem = async () => {
    const result = await axios.get(process.env.server_url + "watch")
    if (result.data.success) {
      setItems(result.data.data)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  console.log(items)
  return (
    <main>
      <Cover list={list} />
      <div className="home_produc">
        <div className="home_product_header">
          header
        </div>
        <div className="home_product_main">
          {
            items.map((item: any, index: number) =>
              <div className="item" key={index}>
                <div className="image">
                  {item.img[0] ? <Image src={process.env.google_url + item.img[0]} width={100} height={100} alt="img" /> : null}
                </div>
                <div className="title">
                  <p>{item.name}</p>
                  <h4>{item.price}</h4>
                </div>
              </div>
            )
          }
        </div>
        <div className="home_product_footer">
          footer
        </div>
      </div>
    </main>
  );
}
