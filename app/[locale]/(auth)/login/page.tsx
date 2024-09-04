"use client"

import { Button, Input } from '@/components/ui';
import Image from 'next/image';
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-between min-h-screen px-5'>
      <form className='flex flex-col items-center justify-center w-1/2 space-y-4'>
        <h1 className="text-3xl font-bold text-secondary">Connexion</h1>
        <p className='text-gray-400 max-w-96 text-center'>Ceci est du texte de description pour justifier de l'utilité de s'inscrire sur notre plateforme PawThera</p>
        <Input className='w-96 rounded-3xl' type='email' placeholder='Email' />
        <Input className='w-96 rounded-3xl' type='password' placeholder='Mot de passe' />
        <Button
          className='w-96 rounded-3xl'
          variant={'secondary'}
          type="submit"
        >
          Se connecter
        </Button>
      </form>
      <Image src={'/assets/svg/login.svg'} alt='login image with a dog an its owner' width={500} objectFit='cover' height={500} className='rounded-2xl' />
    </div>
  )
}

export default LoginPage