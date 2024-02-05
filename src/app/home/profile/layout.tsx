import ProfileLeft from '@/component/home/profile/profile_left'
import ProfileRight from '@/component/home/profile/profile_right'
import React from 'react'
type Props = {
  children: React.ReactNode,
  params: {
    archive: string
  }
}

export async function generateMetadata({ params }: Props) {

  return {
    title: {
      template: '%s | Locand',
      default: "Profile", // a default is required when creating a template
    },
    icons: {
      icon: 'icon/icon.png',
    }
  }
}

const layout = ({ children }: Props) => {

  return (
    <div className="profile grid_box">
      <ProfileLeft />
      <ProfileRight children={children} />
    </div>
  )

}

export default layout
