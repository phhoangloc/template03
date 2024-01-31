import type { Metadata } from "next";
import "../../style/style.css"
import { Inter } from 'next/font/google'
import Header from "@/component/header";
import Menu from "@/component/menu";
import Provider from "@/redux/component/provider";

export const metadata: Metadata = {
  title: {
    template: '%s | Clock',
    default: 'Clock', // a default is required when creating a template
  },
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
    <Provider>
      <Header />
      <Menu />
      {children}
    </Provider>

  );
}
