import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    if (!sessionToken) {
      return Response.json(
        { message: "Invalid session token" },
        {
          status: 400,
        }
      );
    }
    try {
        const result = await authApiRequest.logoutFromNextServertoServer(sessionToken.value)
        return Response.json(result.payload,
            {
              status: 200,
              headers: {

                //xoa cookie session token
                "Set-Cookie": `sessionToken = ; Path=/; HttpOnly=true , Max-Age=0`,
              }}
          );
    } catch (error) {
        if(error instanceof HttpError){
            return Response.json(error.payload,{
                status: error.status
            })
        }else {
            return Response.json({
                message: 'Loi khong xac dinh'
            },{
                status: 500
            })
        }
    }

  }
  
  