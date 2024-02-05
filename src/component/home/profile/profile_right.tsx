import React from 'react'

type Props = {
    children: React.ReactNode
}

const ProfileRight = ({ children }: Props) => {
    return (
        <div className='profileRight xs9'>{children}</div>
    )
}

export default ProfileRight