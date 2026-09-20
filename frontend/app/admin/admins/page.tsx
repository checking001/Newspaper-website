'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  Button,
  Badge,
  Pagination,
  LoadingSpinner,
  SearchBox
} from '@/components/shared'
import { adminAPI } from '@/lib/admin-api'

interface Admin {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
}

export default function AdminsPage () {
  const router = useRouter()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const fetchAdmins = async (page = 1) => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      let data
      if (search) {
        data = await adminAPI.searchAdmins(
          token,
          search,
          roleFilter !== 'all' ? roleFilter : undefined
        )
      } else {
        data = await adminAPI.listAdmins(token, page)
      }

      setAdmins(data.data || [])
      setCurrentPage(data.pagination?.current_page || 1)
      setTotalPages(data.pagination?.last_page || 1)
    } catch (error) {
      console.error('Error fetching admins:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins(currentPage)
  }, [search, roleFilter, currentPage])

  const handleToggleStatus = async (adminId: number) => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    try {
      await adminAPI.toggleAdminStatus(token, adminId)
      fetchAdmins(currentPage)
    } catch (error) {
      console.error('Error toggling admin status:', error)
    }
  }

  const handleDelete = async (adminId: number) => {
    if (!confirm('এই প্রশাসককে মুছে ফেলতে আপনি নিশ্চিত?')) return

    const token = localStorage.getItem('auth_token')
    if (!token) return

    try {
      await adminAPI.deleteAdmin(token, adminId)
      fetchAdmins(currentPage)
    } catch (error) {
      console.error('Error deleting admin:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <div className='flex justify-between items-center mb-[var(--margin-lg)]'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)]'>
          প্রশাসক ব্যবস্থাপনা
        </h1>
        <Button
          variant='primary'
          size='md'
          onClick={() => router.push('/admin/admins/new')}
        >
          + নতুন প্রশাসক
        </Button>
      </div>

      {/* Search & Filter */}
      <div className='mb-[var(--margin-lg)] space-y-[var(--spacing-4)]'>
        <SearchBox placeholder='প্রশাসক খুঁজুন...' onSearch={setSearch} />

        <div className='flex flex-wrap gap-[var(--spacing-2)]'>
          {[
            { label: 'সব ভূমিকা', value: 'all' },
            { label: 'সুপার এডমিন', value: 'super_admin' },
            { label: 'এডমিন', value: 'admin' }
          ].map(role => (
            <button
              key={role.value}
              type='button'
              onClick={() => setRoleFilter(role.value)}
              className={`rounded-full px-[var(--padding-md)] py-[var(--spacing-2)] font-semibold transition-colors ${
                roleFilter === role.value
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Cards */}
      {admins.length > 0 ? (
        <div className='space-y-[var(--spacing-4)] mb-[var(--margin-lg)]'>
          {admins.map(admin => (
            <Card key={admin.id} variant='outlined' padding='lg'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-[var(--spacing-2)] mb-[var(--spacing-2)]'>
                    <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)]'>
                      {admin.name}
                    </h3>
                    <Badge
                      category='default'
                      size='sm'
                      className={
                        admin.role === 'super_admin'
                          ? 'bg-blue-600'
                          : 'bg-gray-600'
                      }
                    >
                      {admin.role === 'super_admin' ? '🔐 সুপার' : '👤 এডমিন'}
                    </Badge>
                    <Badge
                      category='default'
                      size='sm'
                      className={
                        admin.is_active ? 'bg-green-600' : 'bg-red-600'
                      }
                    >
                      {admin.is_active ? '✅ সক্রিয়' : '❌ নিষ্ক্রিয়'}
                    </Badge>
                  </div>
                  <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
                    📧 {admin.email}
                  </p>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mt-[var(--spacing-1)]'>
                    যুক্ত:{' '}
                    {new Date(admin.created_at).toLocaleDateString('bn-BD')}
                  </p>
                </div>

                <div className='flex gap-[var(--spacing-2)] ml-[var(--spacing-4)]'>
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={() =>
                      router.push(`/admin/admins/${admin.id}/edit`)
                    }
                  >
                    সম্পাদনা
                  </Button>
                  <Button
                    variant={admin.is_active ? 'danger' : 'primary'}
                    size='sm'
                    onClick={() => handleToggleStatus(admin.id)}
                  >
                    {admin.is_active ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                  </Button>
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => handleDelete(admin.id)}
                  >
                    মুছুন
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card
          variant='elevated'
          padding='lg'
          className='text-center mb-[var(--margin-lg)]'
        >
          <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
            কোনো প্রশাসক পাওয়া যায়নি
          </p>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl='/admin/admins'
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
  )
}
