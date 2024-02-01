import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HomeProduct from '@/component/home/homeProduct'
import Select from '@/component/items/select'
import Input from '@/component/items/input'
import SearchIcon from '@mui/icons-material/Search';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
type Props = {

}

const Archive = (props: Props) => {
    const [items, setItems] = useState<any>([])
    const [isItemNext, setIsItemNext] = useState<boolean>(false)
    const [brand, setBrand] = useState<string>("")
    const [brandList, setBrandList] = useState<any[]>([])
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const limit = 20

    const getItem = async () => {
        const result = await axios.get(process.env.server_url + `watch?search=${search.toLocaleUpperCase()}&brand=${brand}&skip=${(page - 1) * 20}&limit=${limit}`)
        const resultplus = await axios.get(process.env.server_url + `watch?search=${search.toLocaleUpperCase()}&brand=${brand}&skip=${(page) * 20}&limit=${limit}`)
        if (result.data.success) {
            setItems(result.data.data)
        }
        if (resultplus.data.success && resultplus.data.data.length) {
            setIsItemNext(true)
        } else {
            setIsItemNext(false)
        }
    }

    useEffect(() => {
        getItem()
    }, [search, brand, page])

    const getBrandFromItem = async () => {
        const result = await axios.get(process.env.server_url + `watch`)
        if (result.data.success) {
            const newarr = result.data.data.map((item: any) => item.brand)

            const newBrandList = Array.from(new Set(newarr));

            setBrandList(newBrandList)
        }
    }

    useEffect(() => {
        getBrandFromItem()
    }, [])

    return (
        <div className="home_archive">
            <div className="home_archive_tool">
                <Select name='Brand' options={brandList} onChange={(brand) => setBrand(brand)} />
                <Input name={<SearchIcon />} value={search} onChange={v => setSearch(v)} />
            </div>
            <HomeProduct product_name="ĐỒNG HỒ" items={items} product_brand={brand} />
            <div className="pagination">
                {page > 1 ? <p><ArrowLeftIcon onClick={() => setPage(page - 1)} /></p> : null}
                <p>{page}</p>
                {isItemNext ? <p><ArrowRightIcon onClick={() => setPage(page + 1)} /></p> : null}
            </div>
        </div>
    )
}

export default Archive