import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans, Roboto_Serif } from 'next/font/google'
import Layout from "@/components/admin/layout";
import Provider from "@/redux/component/provider";
import DecideModal from "@/components/modal/decide.modal";
import NoticeModal from "@/components/modal/notice.modal";
import { Modal } from "@/components/modal/modal";

const font = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
})
export const metadata: Metadata = {
  title: "Locand",
  icons: {
    icon: '/icon/robusta.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body className="scroll_none" style={{ scrollBehavior: "smooth" }}>
        <Provider>
          <DecideModal />
          <NoticeModal />
          <Modal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
