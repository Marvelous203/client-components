// 'use client' //client component
// import Link from "next/link";
// import ButtonRedirect from "./components/ButtonRedirect";
// import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
// const isAuth = false;
export default function Home() {
  // const router = useRouter(); //hook useRouter only work in Client Component should add keyword 'use client'
  // const handleNavigate = () => { // có thể tạo component mới để handle button
  //   router.push('/login')
  // }
// if(!isAuth) {
//   redirect('/login'); //  redirect có thể chạy trong client và quá trình render không chạy trong event handler 
// }
  return (
    // <main>
    //   <ul>
    //     <li>
    //       <Link href={"/login"}>Login</Link>
    //     </li>
    //     <li>
    //       {" "}
    //       <Link href={"/register"}>Register</Link>
    //     </li>
    //   </ul>
    //   <ButtonRedirect />
    //   {/* <button onClick={handleNavigate}>
    //     Chuyển trang Login
    //   </button> */}
    // </main>
    <main>
      Home
    </main>
  ); // giữ nguyên page server component
}
