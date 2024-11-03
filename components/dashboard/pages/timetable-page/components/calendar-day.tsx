import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import React from 'react'

const CalendarDay = () => {
  return (
    <Card className='w-full transition-transform duration-200 h-full'>
      <CardHeader>
        <CardTitle className='text-lg font-bold text-gray-600 dark:text-gray-200'>Jour</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default CalendarDay