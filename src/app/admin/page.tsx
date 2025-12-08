'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Hotel } from '@/utils/types'

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="text-center">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-24 w-24 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics Coming Soon</h1>
                <p className="text-xl text-gray-600 mb-8">
                    We're working on bringing you powerful analytics and insights.
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-800 rounded-lg">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="font-medium">In Development</span>
                </div>
            </div>
        </div>
    )
}
