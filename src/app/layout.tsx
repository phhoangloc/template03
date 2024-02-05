import type { Metadata } from "next";
import "../style/style.css"
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: "Lockand",
  icons: {
    icon: 'icon/icon.png',
  }
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
