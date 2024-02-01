import React from 'react'

type Props = {
    archive: string,
    detail: React.ReactNode,
}

const Page = ({ archive, detail }: Props) => {
    return (
        <div className='home_item'>
            {/* cover */}
            <div className="home_item_main grid_box">
                <div className="home_item_main_left xs12 md5">
                    <div className="show">
                        <video src='/video/about.mp4' autoPlay muted playsInline />
                    </div>
                    {/* <div className="images">
                    {item.img && item.img.map((image: string, index: number) =>
                        <div className={`circle ${j == index ? "select" : ""}`} key={index} onClick={() => { setJ(index) }}>
                            <Image src={process.env.google_url + image} width={50} height={50} alt='itemimage' />
                        </div>
                    )}
                </div> */}
                </div>
                <div className="home_item_main_right xs12 md7" id="detail">
                    <h3>{archive}</h3>
                    <div className="detail">
                        {detail}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page