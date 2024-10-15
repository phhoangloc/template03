'use client'
import { setMenu } from "@/redux/reducer/MenuReduce"
import store from "@/redux/store"
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu';

import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Cover from "@/components/home/cover";
export default function Home() {

  const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)

  const update = () => {
    store.subscribe(() => setCurrentMenu(store.getState().menu))
  }

  useEffect(() => {
    update()
  })
  return (
    <div  >
      Home
    </div>
  );
}
