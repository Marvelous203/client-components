import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'

export default function Header() {
  return (
    <div>
        <ul>
            <li>
                <Link href={'/login'} > Đăng Nhập</Link>
            </li>
            <li>
                <Link href={'/register'}> Đăng Kí</Link>
            </li>
        </ul>
        <ModeToggle />
    </div>
  )
}
