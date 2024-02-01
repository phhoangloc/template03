import React, { useState } from 'react'
import Image from 'next/image'
type Props = {
    item: any
}

const HomeItemCover = ({ item }: Props) => {
    const [i, setI] = useState<number>(0)
    return (
        <div className="home_item_cover">
            <div className="show">
                <div className="pic">
                    <Image src={process.env.google_url + item.img[i]} width={200} height={200} alt='itemimage' />
                </div>
            </div>
            <div className="button">
                {item.img && item.img.slice(0, 5).map((image: string, index: number) =>
                    <div className={`circle ${i == index ? "select_img" : ""}`} key={index} onClick={() => { setI(index) }}>
                        <Image src={process.env.google_url + image} width={50} height={50} alt='itemimage' />
                    </div>
                )}
            </div>
            <div className="introduction">
                <p className='name'>{item.name}</p>
                <p className='brand'>{item.brand}</p>
                <p className='price'>{Number(item.price).toLocaleString('en-US')} VND</p>
                <p className='readmore'><a href='#detail' >read more...</a></p>
            </div>
        </div>
    )
}

export default HomeItemCover