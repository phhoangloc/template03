'use client'
import { setMenu } from "@/redux/reducer/MenuReduce"
import store from "@/redux/store"
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu';

import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
export default function Home() {

  return (
    <div >
      <div className="h-12 flex justify-between dark:text-white">
        <MenuIcon className="cursor-pointer !w-12 !h-12 p-2 text-orange-600 dark:text-white opacity-75 hover:opacity-100 lg:!hidden" onClick={() => store.dispatch(setMenu(true))} />
        <div className="h-full flex flex-col justify-center">
          Dashboard
        </div>
        <div>
          <NotificationsIcon className="cursor-pointer !w-12 !h-12 p-2  text-orange-600 dark:text-white opacity-75 hover:opacity-100" />
          <PersonIcon className="cursor-pointer !w-12 !h-12 p-2  text-orange-600 dark:text-white opacity-75 hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}
