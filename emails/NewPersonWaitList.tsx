import React from 'react'
import { EmailLayout } from './EmailLayout'
import { Container } from '@react-email/components'

const NewPersonWaitList = ({ subEmail }: { subEmail: string }) => {
  return (
    <EmailLayout>
      <Container>
        <h1>Hi, you have a new subscriber</h1>
        Email : <p>{subEmail}</p>
      </Container>
    </EmailLayout>
  )
}

export default NewPersonWaitList