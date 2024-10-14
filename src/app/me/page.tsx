import accountApiRequest from "@/apiRequest/account";
import { cookies } from 'next/headers'



export default async function MyProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const result = await accountApiRequest.me(sessionToken?.value ?? '')
  return (
    <div>
      <div className="flex flex-col items-center gap-3">
      <h1>Profile</h1>
        <div>
            Xin Chào <strong>{result.payload.data?.name}</strong>
        </div>
      </div>


    </div>
  )
}
