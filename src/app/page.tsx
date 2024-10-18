'use client'
import { setMenu } from "@/redux/reducer/MenuReduce"
import store from "@/redux/store"
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu';

import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Cover from "@/components/home/cover";

export default function Home() {

  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  const [draggedItem, setDraggedItem] = useState<any>(null);

  const handleDragStart = (index: any) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index: any) => {
    if (draggedItem === index) {
      return;
    }
    const itemsCopy = [...items];
    itemsCopy.splice(draggedItem, 1);
    itemsCopy.splice(index, 0, items[draggedItem]);

    setDraggedItem(index);
    setItems(itemsCopy);
  };

  const handleDrop = () => {
    setDraggedItem(null);
  };

  return (
    <div>
      <Cover />
    </div>
  );
}
