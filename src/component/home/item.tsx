import NotFound from '@/app/not-found'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HomeItemCover from './homeItemCover'

type Props = {
    item: any,
}

const Item = ({ item }: Props) => {
    const [j, setJ] = useState<number>(0)

    if (item && item.genre === "watch") {
        return (
            <div className='home_item'>
                <HomeItemCover item={item} />
                <div className="home_item_main grid_box">
                    <div className="home_item_main_left xs0 md6">
                        <div className="show">
                            <Image src={process.env.google_url + item.img[j]} width={200} height={200} alt='itemimage' />
                        </div>
                        <div className="images">
                            {item.img && item.img.map((image: string, index: number) =>
                                <div className={`circle ${j == index ? "select" : ""}`} key={index} onClick={() => { setJ(index) }}>
                                    <Image src={process.env.google_url + image} width={50} height={50} alt='itemimage' />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="home_item_main_right xs12 md6" id="detail">
                        <h3>{item.name}</h3>
                        <table className='table'>
                            <tbody>
                                <tr><td>name</td><td>{item.name}</td></tr>
                                <tr><td>brand</td><td>{item.brand}</td></tr>
                                <tr><td>price</td><td>{Number(item.price).toLocaleString('en-US')} VND</td></tr>
                            </tbody>
                        </table>
                        <p>----------</p>
                        <div className="detail" dangerouslySetInnerHTML={{ __html: item.detail }}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <NotFound />
    )
}

export default Item