import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans, Roboto_Serif, Alegreya_SC } from 'next/font/google'
import Layout from "@/components/admin/layout";
import Provider from "@/redux/component/provider";
import DecideModal from "@/components/modal/decide.modal";
import NoticeModal from "@/components/modal/notice.modal";
import { Modal } from "@/components/modal/modal";

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  // weight: ["400",]
})
const serif = Alegreya_SC({
  subsets: ['latin'],
  display: 'swap',
  weight: ["400", "500", "700", "800", "900"]

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
    <html lang="en" className={nunito.className}>
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
