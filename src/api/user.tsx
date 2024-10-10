import axios from "axios"


export type BodyTypeWithPosition = {
    position: string,
    archive?: string,
    id?: string,
    slug?: string,
    search?: string,
    skip?: number,
    limit?: number,
    sort?: string,
    update?: number,
    file?: File
}
export const ApiCheckLogin = async () => {
    try {
        const result = await axios.get(process.env.api_url + "api/user", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
        return (result.data)

    } catch (error) {
        return ({ success: false })
    }

}

export const ApiItemUser = async ({ position, archive, search, id, slug, sort, skip, limit }: BodyTypeWithPosition) => {
    try {
        const result = await axios.get(process.env.api_url + "api/" + position +
            "/" + archive +
            "?archive=" + archive +
            "&search=" + `${search ? search : ""}` +
            "&id=" + `${id ? id : ""}` +
            "&slug=" + `${slug ? slug : ""}` +
            "&skip=" + `${skip ? skip : ""}` +
            "&sort=" + `${sort ? sort : ""}` +
            "&limit=" + `${limit ? limit : ""}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            }
        )
        return result.data
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}

export const ApiCreateItem = async ({ position, archive }: BodyTypeWithPosition, body: any) => {
    const result = await axios.post(process.env.api_url + "api/" +
        position +
        "/" + archive,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}
export const ApiUpdateItem = async ({ position, archive, id }: BodyTypeWithPosition, body: any) => {
    const result = await axios.put(process.env.api_url + "api/" +
        position +
        "/" + archive +
        "?id=" + id,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}
export const ApiDeleteItem = async ({ position, archive, id }: BodyTypeWithPosition) => {
    const result = await axios.delete(process.env.api_url + "api/" +
        position +
        "/" + archive +
        "?id=" + id,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}

export const ApiUploadFile = async ({ position, archive, file }: BodyTypeWithPosition) => {
    const formData = new FormData()
    file && formData.append("file", file)
    const fileUpload = await axios.post(process.env.api_url + "api/" + position + "/" + archive, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.token,
        },
    })
    return fileUpload
}
export const ApiChangeMail = async ({ position }: BodyTypeWithPosition, body: any) => {
    const result = await axios.post(process.env.api_url + "api/" +
        position +
        "/sendmailtochangeemail",
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}
export const ApiChangePasword = async ({ position }: BodyTypeWithPosition, body: any) => {
    const result = await axios.post(process.env.api_url + "api/" +
        position +
        "/sendmailtochangepassword",
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}