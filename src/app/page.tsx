"use client"
import Login from "@/component/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {

  const toPage = useRouter()

  const [user, setUser] = useState<boolean>(false)
  useEffect(() => {
    !user && toPage.push("/home")
  }, [user])
  return (
    <Loading />
  )
}
