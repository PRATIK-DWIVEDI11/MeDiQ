'use client'
import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { initAuthListener } from '../lib/authFunctions'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Firebase auth listener is OK here
    initAuthListener()
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
