import Loader from '@/components/loader'
import React from 'react'

const LoadingProfile = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Loader />
    </div>
  )
}

export default LoadingProfile