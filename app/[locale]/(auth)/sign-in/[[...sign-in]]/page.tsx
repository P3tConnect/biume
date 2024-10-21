import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center pt-24'>
      <SignIn />
    </div>
  )
}

export default SignInPage