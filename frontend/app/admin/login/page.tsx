import { Metadata } from 'next'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'লগইন | খবরের কাগজ',
  description: 'সম্পাদক প্যানেলে লগইন করুন',
  robots: {
    index: false
  }
}

export default function LoginPage () {
  return <LoginForm />
}
