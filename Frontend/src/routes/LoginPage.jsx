import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center md:h-[calc(100vh-80px)] h-[calc(100vh-64px)] '>
      <SignIn signUpUrl='/register' />
    </div>
  )
}

export default LoginPage