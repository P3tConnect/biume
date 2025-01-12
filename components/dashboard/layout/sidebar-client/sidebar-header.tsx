import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui';
import { Building, ChevronsUpDown, Plus } from 'lucide-react';
import React from 'react';

const SidebarClientHeaderComponent = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Building className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Patenron</span>
                <span className='truncate text-xs'>Patenron</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='right' align='start' className='w-56'>
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Companies
            </DropdownMenuLabel>
            <DropdownMenuItem className='flex flex-row gap-2 items-center justify-start w-full'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Building className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Acme Inc.</span>
                <span className='truncate text-xs'>Acme Inc.</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex flex-row gap-2 items-center justify-start w-full'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-secondary-foreground'>
                <Building className='size-4 text-black' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Acme Corp.</span>
                <span className='truncate text-xs'>Acme Corp.</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='mx-1' />
            <DropdownMenuItem className='flex flex-row gap-2 items-center justify-start w-full'>
              <div className='flex aspect-square size-6 items-center justify-center rounded-lg bg-gray-300/30 text-sidebar-accent-foreground'>
                <Plus className='size-4' />
              </div>
              <p>Ajouter une entreprise</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarClientHeaderComponent;
