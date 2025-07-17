/**
 * Index Page - Redirects to Dashboard
 */

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const IndexPage: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <span className="text-white text-xl font-bold">₳</span>
        </div>
        <p className="text-gray-600">Loading Treasury Monitor...</p>
      </div>
    </div>
  )
}

export default IndexPage