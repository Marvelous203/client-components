import envConfig from "@/config";

type CustomOptions = RequestInit & {
    baseUrl?: string | undefined
}

class HttpError extends Error {
    status: number;
    payload: any;
    constructor({status, payload}: {status: number, payload:any}){
        super('HttpError')
        this.status = status
        this.payload = payload
    }
}
const request = async (method: 'Get' | 'Post' | 'Put'| 'Delete', url: string, option?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options?.body) : undefined
    const baseHeaders = {
        'Content-Type': 'application/json',
    }
    //neu khong truyen baseURL (hoac baseurl = undefined) thi lay tu env.config 
    // neu truyen baseURL thi lay gia tri vao , truyen ao '' thi dong nghia viec goi api den nextjs server
    const baseUrl = options?.baseUrl === undefined 
    ? envConfig.NEXT_PUBLIC_API_ENDPOINT 
    : options?.baseUrl

    const res = await fetch(`${baseUrl}${url}`)
}