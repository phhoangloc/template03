import React from 'react'

type Props = {
    children: React.ReactNode
}

const ProfileRight = ({ children }: Props) => {
    return (
        <div className='profileRight'>{children}</div>
    )
}

export default ProfileRight