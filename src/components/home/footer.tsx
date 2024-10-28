'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
type Props = {}

const Footer = (props: Props) => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [_innerHeight, set_innerHeight] = useState<number>(window.innerHeight);
    const [clientHieght, setclientHieght] = useState<number>(document.documentElement.scrollHeight);


    useEffect(() => {
        window.addEventListener('scroll', () => { setScrollY(window.scrollY), set_innerHeight(window.innerHeight), setclientHieght(document.body.scrollHeight) });

        return () => {
            window.removeEventListener('scroll', () => { setScrollY(window.scrollY), set_innerHeight(window.innerHeight), setclientHieght(document.body.scrollHeight) });
        };
    }, []);

    return (
        <div className={`w-full fixed h-72 overflow-hidden transition-all duration-500 flex flex-col justify-end ${scrollY > 0 && scrollY + _innerHeight === clientHieght ? "bottom-[0%]" : "bottom-[-100%]"} `}>

            <Image src="/image/staff.png" width={500} height={500} className={`h-full w-auto absolute bottom-0 right-0`} alt="staff" />

            <p className='text-center text-sm leading-6'>copyright onf Inc.</p>
        </div>

    )
}

export default Footer