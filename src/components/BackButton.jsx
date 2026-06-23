'use client'
import React from 'react'
import { BiLeftArrow } from 'react-icons/bi'

const BackButton = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto mb-2">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#232c27] text-[#ebdcc9] text-sm font-bold hover:scale-105 transition-transform"
                >
                    <BiLeftArrow/> Back to previous page
                </button>
            </div>
        </div>
    )
}

export default BackButton