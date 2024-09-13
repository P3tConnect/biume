import Image from 'next/image'
import React from 'react'
import { Button } from '../ui'

const CompanyDetailsHeader = () => {
  return (
    <div className='absolute top-5 bg-background h-16 w-screen rounded-full flex justify-between items-center px-5'>
      <Image 
        src={"/assets/images/Logo couleur et noir.png"}
        alt="logo pawthera"
        width={218}
        height={66}
        className='w-20 sm:w-20 md:w-32 lg:w-44'
      />
      <Button className='bg-black text-white rounded-full'>
        Connexion
      </Button>
    </div>
  )
}

export default CompanyDetailsHeader