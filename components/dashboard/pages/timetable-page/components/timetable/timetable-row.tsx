import {BaseView} from '@devexpress/dx-react-scheduler'
import React from 'react'

const TimetableRow = ({props}: { props: BaseView.RowProps }) => {

  const {children} = props

  return (
    <tr className="w-full flex justify-between">
      <div className="flex w-full gap-2 justify-between">
        {children}
      </div>
    </tr>
  )
}

export default TimetableRow
