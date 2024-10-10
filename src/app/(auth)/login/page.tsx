import React from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div>
      <h1 className='text-xl font-semibold text-center'>Login</h1>
      <div className='flex justify-center'>
      <LoginForm />
      </div>
    </div>
  )
}
