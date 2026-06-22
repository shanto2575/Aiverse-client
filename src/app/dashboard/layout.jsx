import DashboardSideBar from '@/components/dashboard/DashboardSideBar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const DashboardLayout = ({ children }) => {
    return (
        // Changed h-screen overflow-hidden to min-h-screen to support natural vertical flow on mobile viewports
        <div className='flex flex-col md:flex-row min-h-screen bg-[#ebdcc9] text-[#2c221e]'>
            
            {/* Sidebar Wrapper: Collapses to full-width or auto-height on small screens, locks to w-64 on desktops */}
            <div className='w-full md:w-64 border-b md:border-b-0 md:border-r border-[#dfcbaf] px-4 py-4 bg-white/10 backdrop-blur-md shrink-0'>
                <DashboardSideBar />
            </div>
            
            {/* Main Area: Scrollable grid behavior */}
            <div className='flex-1 overflow-y-auto w-full'>
                <main className='p-4 md:p-6'>
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    )
}

export default DashboardLayout