import React from 'react'
import ProfileLeft from './profile/profile_left'
import ProfileRight from './profile/profile_right'
type Props = {
    children: React.ReactNode
}
const Profile = ({ children }: Props) => {
    return (
        <div className='profile'>
            <ProfileLeft />
            <ProfileRight children={children} />
        </div>
    )
}

export default Profile