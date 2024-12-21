import Image from 'next/image'
import React from 'react'

const IntroStep = () => {
  return (
    <div className='w-full h-full flex flex-row justify-center items-center gap-5'>
        <Image 
            src={"/assets/images/login-image.jpg"}
            alt='start-onboarding-image'
            width={100}
            height={100}
            className='rounded-xl w-1/2 h-full object-cover'
        />
        <div className='w-1/2 h-full flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Vous souhaitez vous inscrire en tant que professionnel ?</h1>
            <p className='text-xs mt-2 text-muted-foreground'>Dans ce processus de création de votre établissement, pour y parvenir, vous devrez fournir des informations essentielles sur votre entreprise.</p>
        </div>
    </div>
  )
}

export default IntroStep