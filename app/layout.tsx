import Document, { Html, Head, Main, NextScript } from 'next/document'
import siteMetadata from '@/data/siteMetadata'

import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import { Inter } from '@next/font/google'
import SectionContainer from '@/components/SectionContainer'
import Link from '@/components/Link';
import ThemeSwitch from '@/components/ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({
    subsets: ['latin'],
  })  

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteMetadata.language} className="scroll-smooth">
        {/* <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}> */}
    <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
    </body>
    {/* </ThemeProvider> */}
  </html>
  )
}
