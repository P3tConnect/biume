import CountAnimation from '@/components/magicui/count-animation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { CalendarIcon, CreditCardIcon, DollarSignIcon, UsersIcon } from 'lucide-react'
import React from 'react'

const MetricsWidget = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="grid space-y-2 md:grid-cols-2 lg:grid-cols-4 lg:space-y-0">
        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-muted">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-indigo-200 p-4 dark:bg-indigo-950">
              <CalendarIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">
              <CountAnimation number={2350} />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-muted">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-end justify-start rounded-full bg-green-200 p-4 dark:bg-green-950">
              <UsersIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">
              <CountAnimation number={145} />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+180.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-muted">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Operations</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-end justify-start rounded-full bg-purple-200 p-4 dark:bg-purple-950">
              <CreditCardIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">
              <CountAnimation number={89} />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-19%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-transparent hover:bg-muted">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-end justify-start rounded-full bg-orange-200 p-4 dark:bg-orange-950">
              <DollarSignIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">
              $<CountAnimation number={9583} />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}

export default MetricsWidget