import { Appointments } from '@devexpress/dx-react-scheduler'
import React, { Ref } from 'react'

const AppointementComponent = ({ props }: { props: Appointments.AppointmentProps & { ref?: Ref<unknown> | undefined } }) => {
  return (
    <div className='w-32 h-32 bg-blue-500'>
      <p className='text-black'>Appointment</p>
    </div>
  )
}

export default AppointementComponent