import { BaseView } from '@devexpress/dx-react-scheduler'
import React from 'react'

const TimetableRow = ({ props }: { props: BaseView.RowProps }) => {

  const { children } = props

  return (
    <tr className='flex w-full justify-between'>
      {children}
    </tr>
  )
}

export default TimetableRow