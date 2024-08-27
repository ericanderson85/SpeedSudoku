import Header from "@/components/Header/Header";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <link rel="icon" sizes="any" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/icon-180x180.png" />
      <UserProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
