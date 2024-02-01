'use client'
import Cover from "@/component/home/cover";
import HomeProduct from "@/component/home/homeProduct";
import axios from "axios";
import Link from "next/link";
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
    const result = await axios.get(process.env.server_url + "watch?skip=0&limit=20")
    if (result.data.success) {
      setItems(result.data.data)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <main>
      <Cover list={list} />
      <HomeProduct product_name="ĐỒNG HỒ" items={items} />
      <p className="seemore"><Link href={"/home/watch"}>see more...</Link></p>
    </main>
  );
}
