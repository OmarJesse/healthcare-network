import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Healthcare Network',
  description: 'A healthcare network application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
