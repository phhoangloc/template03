import type { Metadata } from "next";
import "../../style/style.css"
import { Inter } from 'next/font/google'
import Header from "@/component/home/header";
import Menu from "@/component/home/menu";
import Provider from "@/redux/component/provider";

export const metadata: Metadata = {
  title: {
    template: '%s | Locand',
    default: 'Locand', // a default is required when creating a template
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
