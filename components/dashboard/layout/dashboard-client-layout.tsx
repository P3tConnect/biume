import { ScrollArea } from '@/components/ui';
import React from 'react';
import SidebarClientComponent from './sidebar-client/sidebar';
import { Navbar } from './navbar';

const DashboardClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
      <SidebarClientComponent />
      <main className='h-full w-full px-1 py-2 ease-in-out duration-300 flex flex-col'>
        <Navbar />
        <ScrollArea className='pr-4 overflow-y-auto'>{children}</ScrollArea>
      </main>
    </div>
  );
};

export default DashboardClientLayout;
