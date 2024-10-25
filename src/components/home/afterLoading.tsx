import React from 'react'
import Image from 'next/image'
type Props = {
    scrollY: number,
    outerHeight: number
}

const AfterLoading = ({ scrollY, outerHeight }: Props) => {
    return (
        <>
            <div className={`w-max text-center m-auto gap-4 flex  -translate-y-[50%] left-[50vw] -translate-x-[50%] fixed top-[50vh] z-[2] ${scrollY > outerHeight * 1.5 ? "absolute !top-[200vh]" : ""}`}>
                <div className='text-[32px] font-bold' style={{ fontSize: scrollY / 10 + 40 > 60 ? "60px" : scrollY / 10 + 40 + "px" }}>L</div>
                <div className='max-w-16 transition-all' style={{ width: scrollY / 10 + 40 + "px" }}>
                    <Image src={"/image/robusta.png"} width={100} height={100} alt='bean' style={{ width: "auto", height: "full" }} />
                </div>
                <div className='text-[32px] font-bold' style={{ fontSize: scrollY / 10 + 40 > 60 ? "60px" : scrollY / 10 + 40 + "px" }}>C</div>
                <div className='text-[32px] font-bold' style={{ fontSize: scrollY / 10 + 40 > 60 ? "60px" : scrollY / 10 + 40 + "px" }}>E</div>
                <div className='text-[32px] font-bold' style={{ fontSize: scrollY / 10 + 40 > 60 ? "60px" : scrollY / 10 + 40 + "px" }}>N</div>
                <div className='text-[32px] font-bold' style={{ fontSize: scrollY / 10 + 40 > 60 ? "60px" : scrollY / 10 + 40 + "px" }}>D</div>

                {/* <div className="flex gap-4 w-max relative " >
                    <p className={`text-[64px] font-bold transition-all duration-500  opacity-0 -translate-y-full   ${scrollY > outerHeight * 1.2 ? "!opacity-100 !translate-y-0" : ""}`}>L</p>
                    <div className=' relative'>
                        <div className='max-w-20 transition-all' style={{ width: scrollY / 10 + 40 + "px" }}>
                            <Image src={"/image/robusta.png"} width={100} height={100} alt='bean' style={{ width: "auto", height: "full" }} />
                        </div>
                    </div>
                    <p className={`text-[64px] font-bold transition-all duration-500  opacity-0 -translate-y-full   ${scrollY > outerHeight * 1.2 ? "!opacity-100 !translate-y-0" : ""}`}>C</p>
                    <p className={`text-[64px] font-bold transition-all duration-500  opacity-0 -translate-y-full   ${scrollY > outerHeight * 1.2 ? "!opacity-100 !translate-y-0" : ""}`}>E</p>
                    <p className={`text-[64px] font-bold transition-all duration-500  opacity-0 -translate-y-full   ${scrollY > outerHeight * 1.2 ? "!opacity-100 !translate-y-0" : ""}`}>N</p>
                    <p className={`text-[64px] font-bold transition-all duration-500  opacity-0 -translate-y-full   ${scrollY > outerHeight * 1.2 ? "!opacity-100 !translate-y-0" : ""}`}>D</p>
                    <div className=' relative'>
                        <div className='w-16 transition-all'>
                            <Image src={"/image/cfbean.png"} width={100} height={100} alt='bean' style={{ width: "auto", height: "full" }} />
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={` h-screen flex flex-col justify-end `} style={{ opacity: 1 - (scrollY * 2 / outerHeight) }}>
            </div>
            <div className={` h-screen flex flex-col justify-end `} style={{ opacity: 1 - (scrollY * 2 / outerHeight) }}>
                <div className="w-max mx-auto h-24">
                    <p>scroll</p>
                    <div className="w-2 h-2 dark:bg-amber-50 bg-slate-900 rounded-[50%] mx-auto my-1"></div>
                    <div className="w-2 h-2 dark:bg-amber-50 bg-slate-900 rounded-[50%] mx-auto my-1"></div>
                    <div className="w-2 h-2 dark:bg-amber-50 bg-slate-900 rounded-[50%] mx-auto my-1"></div>
                </div>
            </div>
        </>
    )
}

export default AfterLoading