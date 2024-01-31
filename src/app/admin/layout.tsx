import Provider from "@/redux/component/provider"
import Header from "@/component/admin/header"
import Mainleft from "@/component/admin/mainleft"
import "../../style/style.css"

export const metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin'
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const menus = [
    {
      name: "dashboard",
      link: "/dashboard"
    },
    {
      name: "watch",
      link: "/watch"
    },
    {
      name: "user",
      link: "/user"
    },
  ]
  return (
    <Provider>
      <div className='admin'>
        <Header />
        <div className='admin_main'>
          <Mainleft menus={menus} />
          {children}
        </div>
      </div>
    </Provider>
  )
}
