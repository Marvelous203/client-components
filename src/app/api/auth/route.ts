export async function POST(request: Request) {
  const res = await request.json();
  // const sessionToken = res.payload?.data?.token; vi account api tra ve object 
  const sessionToken = res.sessionToken as string;

  if (!sessionToken) {
    return Response.json(
      { message: "Invalid session token" },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    // res.payload, //tra ve json server nextjs
    res,
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken = ${sessionToken}; Path=/; HttpOnly=true`,
      }
    //   server component là server, vậy nên khi vào 1 route là server component, 
    //   thì client tự động đính kèm cookie ở trình duyệt để gửi lên server component 
    //   (và chỉ gửi lên cookie với domain là domain của server compont đó, do client đã call đến api route 
    //     để set-cookie trở lại nên nó sẽ có cookie domain là domain của server compoent ở browser), 
    //     do đó ở server component hoặc api route, có thể dùng cookieStore = cookies() để lấy ra cookie 
    //      bản chất cookie này là do client gửi lên, chứ không phải do server component hoặc api route truy cập vào cookie ở browser lấy ra
    }
  );
}
