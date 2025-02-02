import React from 'react'
import { ScrollArea } from '@/components/ui'
import { DashboardSidebar } from './sidebar/dashboard-sidebar'
import { DashboardHeader } from './header/dashboard-header'
import { DashboardFooter } from './footer/dashboard-footer'
import { Breadcrumbs } from './navigation/breadcrumbs'

interface DashboardClientLayoutProps {
    children: React.ReactNode
}

const DashboardClientLayout: React.FC<DashboardClientLayoutProps> = ({ children }) => {
    return (
        <div className="relative h-screen w-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar avec gestion de collapse */}
                <DashboardSidebar />

                {/* Contenu principal */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader />

                    <main className="flex-1 overflow-y-auto">
                        <div className="container mx-auto px-6 py-4">
                            {/* Navigation */}
                            <Breadcrumbs />

                            {/* Contenu principal */}
                            <div className="mt-4">
                                <ScrollArea className="rounded-lg">
                                    {children}
                                </ScrollArea>
                            </div>
                        </div>
                    </main>

                    <DashboardFooter />
                </div>
            </div>
        </div>
    )
}

export default DashboardClientLayout