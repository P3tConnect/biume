import { Form, FormField, FormItem } from '@/components/ui'
import React from 'react'
import { useForm } from 'react-hook-form'

const ServicesForm = () => {

  const form = useForm({});

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name=''
        render={({ field }) => (
          <FormItem></FormItem>
        )}
      />
      <FormField
        control={form.control}
        name=''
        render={({ field }) => (
          <FormItem></FormItem>
        )}
      />
    </Form>
  )
}

export default ServicesForm