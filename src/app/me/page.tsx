import envConfig from "@/config";
import { cookies } from 'next/headers'



export default async function MyProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken?.value}`,
        },

      }).then(async (response) => {
        const payload = await response.json();
        const data = {
          status: response.status,
          payload
        };
        if (!response.ok) {
          throw data;
        }
        return data;
      })
  return (
    <div>
        <h1>Profile</h1>
        <div>
            Xin Chào {result.payload.data?.name}
        </div>

    </div>
  )
}
