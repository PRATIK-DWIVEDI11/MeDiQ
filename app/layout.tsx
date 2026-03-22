'use client'
import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { initAuthListener } from '../lib/authFunctions'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAuthListener()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('✅ SW registered'))
        .catch(err => console.log('SW failed:', err))
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MeDiQ" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// 'use client'
// import { useEffect } from 'react'
// import { Inter } from 'next/font/google'
// import { ThemeProvider } from 'next-themes'
// import './globals.css'
// import { initAuthListener } from '../lib/authFunctions'

// const inter = Inter({ subsets: ['latin'] })

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     initAuthListener()
//   }, [])

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
