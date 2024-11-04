import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import React from 'react'

const ProDocumentsStep = () => {
  return (
    <Card className='h-full rounded-2xl'>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          Vous êtes maintenant sur la page pour renseigner vos documents. <br /> Vous pouvez modifier ces documents à tout moment.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default ProDocumentsStep