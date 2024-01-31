import React from 'react'

type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    return (
        <div>{params.archive}</div>
    )
}

export default page