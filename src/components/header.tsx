import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import ButtonLogout from "./buttonLogout";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequest/account";

export default async function Header() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value ?? "";
  let user = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken);
    user = data.payload.data;
  }
  return (
    <div className="flex justify-end gap-3">
      <Link href={"/product/add"}>Add product</Link>
      <Link href={"/"}>Home</Link>
      <div className="flex gap-2">
        {user ? (
          <>
            <div>Xin Chao {user.name}</div>
            <Link href={"/me"}>Profile</Link>
            <ButtonLogout />
          </>
        ) : (
          <>
            <Link href={"/login"}> Đăng Nhập</Link>

            <Link href={"/register"}> Đăng Kí</Link>
          </>
        )}

      </div>
      <ModeToggle />
    </div>
  );
}
