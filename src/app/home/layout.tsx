import type { Metadata } from "next";
import "../../style/style.css"
import Header from "@/component/home/header";
import Menu from "@/component/home/menu";
import Provider from "@/redux/component/provider";

export const metadata: Metadata = {
  title: {
    template: '%s | Lockand',
    default: 'Lockand', // a default is required when creating a template
  },
  icons: {
    icon: 'icon/icon.png',
  }
}

export default function Home({
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
