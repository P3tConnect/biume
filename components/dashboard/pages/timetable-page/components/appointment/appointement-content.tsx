import { Appointments } from '@devexpress/dx-react-scheduler'

const AppointmentContent = ({ props }: { props: Appointments.AppointmentContentProps }) => {
  return (
    <div className='bg-orange-700 h-full w-full'>
      <p className='text-black'>Bonjour</p>
    </div>
  )
}

export default AppointmentContent