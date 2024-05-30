import React from 'react'
import { EmailLayout } from './EmailLayout'

const NewPersonWaitList = ({ subEmail }: { subEmail: string }) => {
  return (
    <EmailLayout>
      <div className='h-screen w-screen justify-center items-center'>
        <h1>Hi, you have a new subscriber</h1>
        Email : <p>{subEmail}</p>
      </div>
    </EmailLayout>
  )
}

export default NewPersonWaitList