import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { Bell } from 'lucide-react'
import React from 'react'

const Notifications = () => {
  return (
    <DropdownMenu>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full h-8 w-8 p-0"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          Notifications
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className='w-56' side='bottom' align='end'>
        <DropdownMenuLabel className='font-bold'>
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notifications