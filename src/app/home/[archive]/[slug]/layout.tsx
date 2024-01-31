import React from 'react'
type Props = {
  children: React.ReactNode,
  params: {
    archive: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {

  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return {
    title: capitalizeFirstLetter(params.slug),
  }
}

const layout = ({ children }: Props) => {

  return children

}

export default layout
