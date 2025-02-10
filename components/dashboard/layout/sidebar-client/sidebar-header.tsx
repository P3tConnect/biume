'use client';

import { SidebarMenu, SidebarMenuItem } from '@/components/ui';
import Image from 'next/image';
import React from 'react';

const SidebarClientHeaderComponent = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className='flex items-center gap-2 w-full'>
          <Image
            src='/assets/images/Icone.png'
            alt='Biome'
            className='size-8'
            width={32}
            height={32}
          />
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Biume</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarClientHeaderComponent;
