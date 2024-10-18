import Image from 'next/image'
import React from 'react'
import Button from '../button/button'
import { useRouter } from 'next/navigation'
type Props = {}

const Cover = (props: Props) => {

    const toPage = useRouter()
    return (
        <div className='w-sreen h-screen relative bg-amber-50'>
            <Image src="/image/library.webp" fill className='object-cover opacity-25 z-0' alt="cover" />

            <div className="w-full h-full max-w-[1600px] m-auto gap-2  relative z-[1] lg:grid  lg:grid-cols-2">
                <div className='h-1/2 flex flex-col justify-center text-center lg:h-full'>
                    <div className="bg-white rounded p-4 shadow-md mx-auto w-11/12">
                        <p className='text-3xl font-bold mb-2'>Nice to meet you, today.</p>
                        <p className='text-3xl font-bold'>Can I help you?</p>
                    </div>
                    <div className="flex flex-wrap  mx-auto gap-1 my-1 w-11/12 justify-center">
                        <Button name="Register" onClick={() => toPage.push("/signup")} sx="!m-0" />
                        <Button name="Log In" onClick={() => toPage.push("/log in")} sx="!m-0" />
                    </div>
                </div>
                <div className='h-1/2 lg:h-full lg:flex lg:flex-col lg:justify-end'>
                    <div className=' h-full w-max lg:h-1/2 ml-auto mr-0'>
                        <Image src="/image/staff.png" width={500} height={500} className='w-auto h-full ' alt="staff" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cover