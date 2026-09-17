'use client'

import Link from 'next/link'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export default function Footer () {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-brand-primary text-white mt-16'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* About */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{SITE_NAME}</h3>
            <p className='text-sm text-gray-300'>{SITE_DESCRIPTION}</p>
          </div>

          {/* Categories */}
          <div>
            <h4 className='font-bold mb-4'>প্রধান ক্যাটাগরি</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/categories/bangladesh' className='hover:underline'>
                  বাংলাদেশ
                </Link>
              </li>
              <li>
                <Link href='/categories/politics' className='hover:underline'>
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link href='/categories/economy' className='hover:underline'>
                  অর্থনীতি
                </Link>
              </li>
              <li>
                <Link href='/categories/sports' className='hover:underline'>
                  ক্রীড়া
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-bold mb-4'>দ্রুত লিঙ্ক</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/about' className='hover:underline'>
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:underline'>
                  যোগাযোগ করুন
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='hover:underline'>
                  গোপনীয়তা নীতি
                </Link>
              </li>
              <li>
                <Link href='/terms' className='hover:underline'>
                  শর্তাবলী
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='font-bold mb-4'>নিউজলেটার</h4>
            <p className='text-sm text-gray-300 mb-3'>
              প্রতিদিনের খবর আপনার ইনবক্সে পান
            </p>
            <form className='flex'>
              <input
                type='email'
                placeholder='ইমেইল'
                className='flex-1 px-3 py-2 rounded-l-lg text-gray-900'
              />
              <button
                type='submit'
                className='px-4 py-2 bg-brand-accent rounded-r-lg hover:bg-blue-600 transition'
              >
                সাইন আপ
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-sm text-gray-300'>
            © {currentYear} {SITE_NAME}. সর্বাধিকার সংরক্ষিত।
          </p>
          <div className='flex gap-4 mt-4 md:mt-0'>
            <a href='#' className='hover:underline'>
              ফেসবুক
            </a>
            <a href='#' className='hover:underline'>
              টুইটার
            </a>
            <a href='#' className='hover:underline'>
              ইনস্টাগ্রাম
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
