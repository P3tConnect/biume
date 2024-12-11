"use client"

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import React from 'react'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage = () => {
  redirect('/')
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary-300 to-card-300'>
      <Card className='w-full max-w-md p-6 space-y-4 rounded-xl bg-card/40'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold'>Connexion</CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <AutoForm formSchema={schema} fieldConfig={{
            password: {
              inputProps: {
                className: "rounded-xl",
                type: "password"
              }
            },
            email: {
              inputProps: {
                className: "rounded-xl",
                type: "email"
              }
            },
          }}>
            <AutoFormSubmit className='w-full'>Me Connecter</AutoFormSubmit>
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage