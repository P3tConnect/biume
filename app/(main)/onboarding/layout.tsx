import React, { PropsWithChildren, ReactNode } from 'react'

const OnBoardingLayout = ({ children, pro, client }: PropsWithChildren<{ pro: ReactNode, client: ReactNode }>) => {
  return (
    <>{children}{pro}{client}</>
  )
}

export default OnBoardingLayout