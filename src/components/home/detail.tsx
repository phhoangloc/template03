import React, { useState } from 'react'
import XIcon from '@mui/icons-material/X';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useSearchParams, useRouter } from 'next/navigation';
import moment from 'moment';
import HomeIcon from '@mui/icons-material/Home';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
type Props = {
    data: any,
}

export const Detail = ({ data }: Props) => {
    // const [_chapterIndex, set_chapterIndex] = useState<number>(-1)

    const query = useSearchParams()
    const toPage = useRouter()
    const queryChapterIndex = query.get("chapter")
    return (
        <div className='w-full min-h-screen'>
            <div className="w-full md:max-w-screen-md md:flex lg:max-w-screen-lg xl:max-w-screen-xl  m-auto">
                <div className='h-12 md:w-12  flex justify-end px-2 lg:h-max lg:py-4 lg:px-0'>
                    <p></p>
                    <div className='w-max h-max'>
                        <HomeIcon className='!w-10 !h-10 p-2 cursor-pointer hover:bg-inherit hover:text-white hover:opacity-100 !transition-all !duration-500 hover:p-1 bg-white text-slate-500 rounded-[50%] m-1 ' onClick={() => toPage.push("/")} />
                        <FacebookIcon className='!w-10 !h-10 p-2 cursor-pointer hover:bg-inherit hover:text-white hover:opacity-100 !transition-all !duration-500 hover:p-1 bg-white text-slate-500 rounded-[50%] m-1 ' />
                        <XIcon className='!w-10 !h-10 p-2 cursor-pointer hover:bg-inherit hover:text-white hover:opacity-100 !transition-all !duration-500 hover:p-1 bg-white text-slate-500 rounded-[50%] m-1 ' />
                        <InstagramIcon className='!w-10 !h-10 p-2 cursor-pointer hover:bg-inherit hover:text-white hover:opacity-100 !transition-all !duration-500 hover:p-1 bg-white text-slate-500 rounded-[50%] m-1 ' />
                        <LinkedInIcon className='!w-10 !h-10 p-2 cursor-pointer hover:bg-inherit hover:text-white hover:opacity-100 !transition-all !duration-500 hover:p-1 bg-white text-slate-500 rounded-[50%] m-1 ' />
                        {data?.archive === "book" ? <FileDownloadIcon className='!w-10 !h-10 p-2 cursor-pointer hover:bg-inherit hover:text-white hover:opacity-100 !transition-all !duration-500 hover:p-1 bg-white text-slate-500 rounded-[50%] m-1 ' /> : null}
                    </div>
                </div>
                <div className='grid md:w-full-12 lg:grid-cols-4 p-4 gap-4 '>
                    <div className="w-full col-span-3 grid gap-4">
                        <div className="w-full bg-white dark:bg-slate-800 shadow-md rounded grid gap-12 p-4 md:p-8 xl:p-12 grid-cols-1">

                            <div className=' '>
                                <p className='font-bold text-2xl xl:text-3xl py-2 border-b-2 mb-2 font-serif'>{data?.name}</p>
                                <p className='opacity-75 text-sm'><span className='opacity-50'>Owner:</span> {data?.host.username}</p>
                                <p className='opacity- text-sm'><span className='opacity-50'>Public Date:</span> {moment(data?.createdAt).format("YYYY/MM/DD")}</p>
                            </div>
                            <div className="relative overflow-hidden w-full h-80 bg-white dark:bg-slate-900">
                                {data?.cover.name ?

                                    <Image src={process.env.ftp_url + data?.cover.name} fill className={data?.archive === "book" ? 'object-contain' : 'object-cover'} alt="cover" /> :
                                    <div className="w-full h-full flex flex-col justify-center text-center">NO IMAGE</div>}
                            </div>
                            {
                                queryChapterIndex === null ? null :
                                    <div className='font-bold text-2xl'>{data?.chapters?.[queryChapterIndex].name}</div>
                            }
                            <div className='dangerous_box text-justify text-slate-800 dark:text-slate-200 ' dangerouslySetInnerHTML={{ __html: queryChapterIndex ? data?.chapters?.[queryChapterIndex].content : data?.content }} />

                        </div>

                    </div>
                    <div className="w-full col-span-3 lg:col-span-1 h-full">
                        {
                            data?.chapters?.length > 0 ?
                                <div className='sticky top-20 bg-white dark:bg-slate-800 shadow-md rounded'>
                                    <div className='max-h-'>
                                        <div className='font-bold h-12 flex flex-col justify-center px-4 '>
                                            <p className='opacity-75'>CHAPTERS</p>
                                        </div>
                                        <div className="w-full h-max overflow-auto scroll_none px-4 pb-1">
                                            <div className={`cursor-pointer flex flex-col justify-center h-14 border-b-[1px] border-white dark:border-slate-700 ${queryChapterIndex === null ? "border-orange-600 text-orange-600" : ""}`} onClick={() => toPage.push("?")}>
                                                Tại sao nên đọc
                                            </div>
                                            {data.chapters.map((chapter: any, index: number) =>
                                                <div className={`cursor-pointer flex flex-col justify-center h-max py-2  border-b-[1px] border-white dark:border-slate-700 ${queryChapterIndex && index === Number(queryChapterIndex) ? "border-orange-600 text-orange-600" : ""}`} key={index} onClick={() => toPage.push("?chapter=" + index)}>
                                                    <p>{chapter.name}</p>
                                                    <p className='text-xs opacity-50'>{moment(chapter.updateDate).format("YYYY/MM/DD")}</p>
                                                </div>)}

                                        </div>
                                    </div>
                                </div> :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}