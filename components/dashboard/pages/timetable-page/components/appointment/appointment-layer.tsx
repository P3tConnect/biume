import { BaseView } from '@devexpress/dx-react-scheduler'
import React from 'react'

const AppointmentLayer = ({ props }: { props: BaseView.AppointmentLayerProps }) => {

  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}

export default AppointmentLayer