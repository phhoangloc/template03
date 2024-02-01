import React from 'react'
type Props = {
  children: React.ReactNode,
  params: {
    archive: string
  }
}

export async function generateMetadata({ params }: Props) {

  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return {
    title: {
      template: '%s | Locand',
      default: capitalizeFirstLetter(params.archive), // a default is required when creating a template
    },
    icons: {
      icon: 'icon/icon.png',
    }
  }
}

const layout = ({ children }: Props) => {

  return children

}

export default layout
