'use client'
import { useState, useEffect } from "react";

import { ApiItem } from "@/api/client";
import Header from "@/components/home/header";
import { Menu } from "@/components/home/menu";
import Parallax from "@/components/home/parallax";
import Footer from "@/components/home/footer";
import moment from "moment";

export default function Home() {
  const [book, setBook] = useState<any[]>([])
  const [blog, setBlog] = useState<any[]>([])


  const getData = async (a: string, limit: number) => {
    const result = await ApiItem({ archive: a, limit: limit })
    if (result.success) {
      a === "book" && setBook(result.data)
      a === "blog" && setBlog(result.data)
    }
  }

  useEffect(() => {
    getData("book", 10)
    getData("blog", 10)
  }, [])

  return (
    <div className="bg-amber-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Menu />
      <Header />
      <Parallax data={[...book, ...blog].sort((a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime())} />
      <Footer />
    </div >
  );
}
