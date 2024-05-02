import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { feedModel } from '@/model/feed'

const post = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    connectMongoDB()

    const query = req.query
    const body = req.body
    const method = req.method
    const result: {
        success: boolean,
        data?: any
        message?: string
    } = { success: false }
    switch (method) {
        case "GET":
            feedModel.find()
                .find(query.id ? { "_id": query.id } : {})
                .sort({ "createDate": -1 })
                .catch((error: Error) => {
                    result.success = false
                    result.message = error.message
                    res.json(result)
                })
                .then((data: any) => {
                    result.success = true
                    result.data = data
                    res.json(result)

                })
            break
        case "POST":
            feedModel.create(body)
                .catch((error: Error) => {
                    result.success = false
                    result.message = error.message
                    res.json(result)
                })
                .then((data: any) => {
                    result.success = true
                    result.data = data
                    res.json(result)
                })

    }
}


export default post