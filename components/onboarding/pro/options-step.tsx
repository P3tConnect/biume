import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import React from 'react'

const ProOptionsStep = () => {
  return (
    <Card className='h-full rounded-2xl'>
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>
          Vous êtes maintenant sur la page pour renseigner les options de vos services. <br /> Vous pouvez modifier ces options à tout moment.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default ProOptionsStep