import type { Metadata } from "next";
import { Noto_Sans } from 'next/font/google'
import "../style/style.css"
export const metadata: Metadata = {
  title: "ASTEM ALERT",
}

const inter = Noto_Sans({
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
