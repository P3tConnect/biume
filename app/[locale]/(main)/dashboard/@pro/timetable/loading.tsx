import Loader from '@/components/loader'
import React from 'react'

const LoadingTimeTable = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <Loader />
    </div>
  )
}

export default LoadingTimeTable