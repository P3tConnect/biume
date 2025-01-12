"use client"

import { ScrollArea } from '@/components/ui'
import useWindowSize from '@/src/hooks/use-window-size';
import React from 'react'
import SidebarClientComponent from './sidebar-client/sidebar';
import { Navbar } from './navbar';

const DashboardClientLayout = ({ children }: { children: React.ReactNode }) => {
    const { windowSize } = useWindowSize();

    return (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
            <SidebarClientComponent />
            <main className='min-h-[calc(100vh_-_22px)] w-full px-1 ease-in-out duration-300 flex flex-col'>
                <Navbar />
                <ScrollArea
                    className='pr-3'
                    style={{ height: `${windowSize.height! - 85}px` }}
                >
                    {children}
                </ScrollArea>
            </main>
        </div>
    )
}

export default DashboardClientLayout