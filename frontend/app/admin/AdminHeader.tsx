'use client'

import { useEffect, useState } from 'react'
import { AuthService, User } from '@/lib/auth'

export default function AdminHeader () {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AuthService.getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center'>
      <h2 className='text-2xl font-bold text-brand-primary'>
        স্বাগতম, {user?.name || 'অতিথি'}
      </h2>
      <div className='flex items-center space-x-4'>
        <span className='text-sm text-gray-600'>{user?.email}</span>
        <div className='w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-white font-bold'>
          {user?.name?.charAt(0) || 'A'}
        </div>
      </div>
    </header>
  )
}
