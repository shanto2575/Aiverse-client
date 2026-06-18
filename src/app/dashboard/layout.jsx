import DashboardSideBar from '@/components/dashboard/DashboardSideBar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const DashboardLayout = ({ children }) => {

    return (
        <div className='flex h-screen overflow-hidden bg-[#ebdcc9] text-[#2c221e]'>
            <div className='w-64 border-r border-[#dfcbaf] px-4 py-4 bg-white/10 backdrop-blur-md'>
                <DashboardSideBar />
            </div>
            <div className='flex-1 overflow-y-auto'>
                <main className='p-6'>
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    )
}

export default DashboardLayout