import Provider from "@/redux/component/provider"
import Header from "@/component/admin/header"
import Mainleft from "@/component/admin/mainleft"
import "../../style/style.css"
import Mainright from "@/component/admin/mainright"
import DashboardIcon from '@mui/icons-material/Dashboard';
import WatchIcon from '@mui/icons-material/Watch';
import PersonIcon from '@mui/icons-material/Person';
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
      icon: <DashboardIcon />,
      name: "dashboard",
      link: "/dashboard",

    },
    {
      icon: <WatchIcon />,
      name: "watch",
      link: "/watch"
    },
    {
      icon: <PersonIcon />,
      name: "user",
      link: "/user"
    },
  ]
  return (
    <Provider>
      <div className='admin light'>
        <Header />
        <div className='admin_main'>
          <Mainleft menus={menus} />
          <Mainright children={children} />
        </div>
      </div>
    </Provider>
  )
}
