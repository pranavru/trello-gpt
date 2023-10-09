import { ReactNode } from 'react';
import './globals.css'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trello 2.0',
  description: 'Test app to learn new technologies - with GPT',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout ({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>{children}</body>
    </html>
  )
}
