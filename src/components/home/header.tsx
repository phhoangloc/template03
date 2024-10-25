'use client'
import React, { useState, useEffect } from 'react'
import { IconDrop } from '../input/select'
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { menus } from './menu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
type Props = {
}

const Header = ({ }: Props) => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [scrollUp, setScrollUp] = useState<boolean>(false);
    const [outerHeight, setOuterHeight] = useState<number>(window.outerHeight);

    const handleWheel = (event: any) => {
        if (event.deltaY > 0) {
            setScrollUp(true);
        } else {
            setScrollUp(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => { setScrollY(window.scrollY), setOuterHeight(window.outerHeight) });
        window.addEventListener('wheel', (e) => handleWheel(e));
        return () => {
            window.removeEventListener('wheel', (e) => handleWheel(e));

            window.removeEventListener('scroll', () => { setScrollY(window.scrollY), setOuterHeight(window.outerHeight) });
        };
    }, []);

    const toPage = useRouter()
    return (
        <div className={` fixed w-screen top-0 left-0  transition-all duration-500 z-[2] p-2   ${scrollUp ? "-translate-y-full opacity-0" : "translate-y-0 opacity-1"}`}>
            <div className={`rounded flex justify-between max-w-screen-xxl m-auto p-2`}>
                <div className='h-12 flex'>
                    <MenuIcon className='!w-12 !h-12 p-2 md:!hidden cursor-pointer' onClick={() => store.dispatch(setMenu(true))} />
                    <div className='flex text-4xl h-full font-bold leading-[48px]'>L<Image src="/image/robusta.png" width={20} height={20} className='w-auto h-4/5 my-auto mx-1' alt='bean' />CAND</div>
                </div>
                <div className="hidden md:flex rounded  ">
                    {
                        menus.map((item, index) =>
                            < div key={index} className={`h-12  px-4 flex flex-col justify-center  cursor-pointer bg-white dark:bg-slate-900  mx-2 shadow-md border-[1px] border-slate-200 dark:border-slate-700 rounded`}
                                onClick={(e) => { e.stopPropagation(), item.link ? toPage.push(item.link) : null }}>
                                {item.name}
                            </div>

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
