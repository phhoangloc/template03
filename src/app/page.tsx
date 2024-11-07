'use client'
import { useState, useEffect, useRef } from "react";
import Cover from "@/components/home/cover";
import Image from "next/image";
import { ApiItem } from "@/api/client";
import { useRouter } from "next/navigation";
import { styleText } from "util";
import { Opacity } from "@mui/icons-material";
import AfterLoading from "@/components/home/afterLoading";
import ListBookCard from "@/components/cards/listCard";
import Header from "@/components/home/header";
import { Menu } from "@/components/home/menu";
import Parallax from "@/components/home/parallax";
import Footer from "@/components/home/footer";

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
      <Parallax data={[...book, ...blog]} />
      {/* <div className="h-72"></div> */}
      <Footer />
      {/* <Cover /> */}
      {/* <AfterLoading scrollY={scrollY} outerHeight={outerHeight} /> */}
      {/* <ListBookCard place="home" data={book} /> */}
    </div >
  );
}
