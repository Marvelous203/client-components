'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ButtonRedirect() {
      const router = useRouter(); //hook useRouter only work in Client Component should add keyword 'use client'
  const handleNavigate = () => {
    router.push('/login')
  }
  return (
    <button onClick={handleNavigate}>
    Chuyển trang Login
  </button>  )
}
