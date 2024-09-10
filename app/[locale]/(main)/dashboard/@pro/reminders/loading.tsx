import Loader from '@/components/loader'

const LoadingReminders = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Loader />
    </div>
  )
}

export default LoadingReminders