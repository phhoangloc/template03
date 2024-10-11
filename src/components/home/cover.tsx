import React, { useState } from 'react'
import Image from 'next/image'
type Props = {}

const Cover = (props: Props) => {

    const [_i, set_i] = useState<number>(-1)
    const list = [
        {
            name: "vietnam",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            img: "vn_coffee.jpg"
        },
        {
            name: "brazil",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            name: "ethiopia",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            name: "colombia",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            name: "indonesia",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            name: "america",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
    ]

    return (
        <div className='relative w-screen h-screen min-h-[800px]'>
            <div className="absolute w-full h-full  z-[1] backdrop-blur-sm backdrop-brightness-50">
                <div className='max-w-[1200px] m-auto h-full flex flex-col justify-center '>
                    <div className='grid w-5/6 lg:w-1/2 grid-cols-2 gap-4 m-auto lg:m-0'>
                        {list.map((li, index) =>
                            <div key={index} className="p-4 bg-orange-900 text-white flex flex-col justify-center text-center rounded opacity-95 cursor-pointer" onClick={() => set_i(index)} >
                                <p className='text-lg font-bold mb-1'>{li.name}</p>
                                <p className='text-sm opacity-75  text-justify'>{li.content}</p>
                            </div>)}
                    </div>
                </div>
            </div>
            <Image src={"/image/cover_01.jpg"} fill className="object-cover" alt="cover" />
            {list[_i]?.img ? <Image src={"/image/" + list[_i].img} fill className="object-cover" alt="cover" /> : null}

        </div>
    )
}

export default Cover