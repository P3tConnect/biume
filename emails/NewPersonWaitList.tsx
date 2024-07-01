import React from 'react'
import { EmailLayout } from './EmailLayout'
import { Container, Text } from '@react-email/components'

const NewPersonWaitList = ({ subEmail }: { subEmail: string }) => {
  return (
    <EmailLayout>
      <Container>
        <Text className=''>Hi, you have a new subscriber</Text>
        Email : <p>{subEmail}</p>
      </Container>
    </EmailLayout>
  )
}

export default NewPersonWaitList