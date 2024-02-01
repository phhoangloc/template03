import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
    items: any[],
    product_name: string
    product_brand?: string
}

const HomeProduct = ({ items, product_name, product_brand }: Props) => {
    const toPage = useRouter()
    return (
        <div className="home_product">
            <div className="home_product_header">
                <h2>{product_name}</h2>
                <h1>{product_brand ? product_brand : null}</h1>
            </div>
            <div className="home_product_main grid_box">
                {
                    items.map((item: any, index: number) =>
                        <div className="item xs6 sm4 md3" key={index} onClick={() => toPage.push("/home/" + item.genre + "/" + item.slug)} >
                            <div className="image">
                                {item.img[0] ? <Image src={process.env.google_url + item.img[0]} width={100} height={100} alt="img" /> : null}
                            </div>
                            <div className="title">
                                <p>{item.name}</p>
                                <h4>{Number(item.price).toLocaleString('en-US')} VND</h4>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default HomeProduct