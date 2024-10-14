import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { normalizePath } from "./utils";

type CustomOptions = RequestInit & {
    baseUrl?: string | undefined
}
const ENTITY_ERROR_STATUS = 422

type EntityErrorPayload = {
    message: string
    errors: {
        field : string,
        message: string
    }[]
}

 export class HttpError extends Error {
    status: number;
    payload: {message: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor({status, payload}: {status: number, payload:any}){
        super('HttpError')
        this.status = status
        this.payload = payload
    }
}
export class EntityError extends HttpError {
    status: 422;
    payload: EntityErrorPayload
    constructor({status,payload}: {status: 422, payload:EntityErrorPayload}){
        super({status,payload})
        this.status=status
        this.payload=payload
    }
}
    class SessionToken{
        private token = ''
        get value(){
            return this.token
        }
        set value(token:string){
            if(typeof window === undefined) {
                throw new Error('Cannot set session token server side')
        }
        this.token = token
    }
    }
    export const ClientSessionToken = new SessionToken()

const request = async<Response> (method: 'GET' | 'POST' | 'PUT'| 'DELETE', url: string, option?: CustomOptions | undefined) => {
    const body = option?.body ?
    (option?.body instanceof FormData ? option?.body 
    :JSON.stringify(option?.body)) 
    : undefined
    const baseHeaders = body instanceof FormData ? {
        'Authorization': ClientSessionToken.value ? `Bearer ${ClientSessionToken.value}` : ''
    }:{
        'Content-Type': 'application/json',
        'Authorization': ClientSessionToken.value ? `Bearer ${ClientSessionToken.value}` : ''
    }
    //neu khong truyen baseURL (hoac baseurl = undefined) thi lay tu env.config 
    // neu truyen baseURL thi lay gia tri vao , truyen ao '' thi dong nghia viec goi api den nextjs server
    const baseUrl = option?.baseUrl === undefined 
    ? envConfig.NEXT_PUBLIC_API_ENDPOINT 
    : option?.baseUrl
     
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
    const res = await fetch(fullUrl,{
        ...option,
        headers: {
            ...baseHeaders,
            ...option?.headers
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        body,
        method
    })
    const payload : Response = await res.json()
    const data = {
        status: res.status,
        payload,
    }
    if(!res.ok){
        if(res.status === ENTITY_ERROR_STATUS){
            throw new EntityError(data as {
                status: 422
                payload : EntityErrorPayload
            })
        }else{
            throw new HttpError(data)
        }

    }
    //Logic chi chay phia client
    if(typeof window !== undefined){
    if(['auth/login','auth/register'].some(item => item === normalizePath(url))){
        ClientSessionToken.value = (payload as LoginResType).data.token
    }else if('auth/logout' === normalizePath(url)){
        ClientSessionToken.value = ''
    }
}
    return data
}
const http ={
    get<Response>(url: string, option?: Omit<CustomOptions, 'body'> | undefined ){
        return request<Response>('GET', url, option)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post<Response>(url: string,body: any, option?: Omit<CustomOptions, 'body'> | undefined ){
        return request<Response>('POST', url, {...option, body})
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put<Response>(url: string,body: any, option?: Omit<CustomOptions, 'body'> | undefined ){
        return request<Response>('PUT', url, {...option, body})
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete<Response>(url: string,body: any, option?: Omit<CustomOptions, 'body'> | undefined ){
        return request<Response>('DELETE', url, {...option, body})
    },
}
export default http