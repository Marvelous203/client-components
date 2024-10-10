'use client'
import { ClientSessionToken } from "@/lib/http";
import { useState } from "react";

// const AppContext = createContext({
//     sessionToken : '',
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     setSessionToken: (sessionToken : string) =>{}
// })
// export const useAppContext = ( ) =>{
//     const context = useContext(AppContext)
//     if(!context){
//         throw new Error('useAppContext must be used within an AppProvider')
//     }
//     return context
// }
// const AppContext = createContext({

// });
export default function AppProvider({
    children,
    initialSessionToken = ''
    }:{
    children: React.ReactNode
    initialSessionToken?: string
    }){

    // const [sessionToken, setSessionToken] = useState(initialSessionToken)
    useState(()=> {
        if(typeof window !== undefined){
        ClientSessionToken.value = initialSessionToken
        }
    })    

    return(
        <>
        {children}
        </>
)
}