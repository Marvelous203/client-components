import accountApiRequest from "@/apiRequest/account";
import { cookies } from 'next/headers'



export default async function MyProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const result = await accountApiRequest.me(sessionToken?.value ?? '')
  return (
    <div>
        <h1>Profile</h1>
        <div>
            Xin Chào {result.payload.data?.name}
        </div>

    </div>
  )
}
