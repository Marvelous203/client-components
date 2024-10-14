'use client'

import authApiRequest from "@/apiRequest/auth"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"

export default function ButtonLogout() {
    const router = useRouter()
    const handleLogout = async()=>{
        try {
            await authApiRequest.logoutFromNextClienttoServer()
            router.push('/login')
            router.refresh()
        } catch (error) {
            handleErrorApi(error)
        }
    }
  return (
    <Button size={'sm'} onClick={handleLogout}>
        Logout
    </Button>
  )
}
