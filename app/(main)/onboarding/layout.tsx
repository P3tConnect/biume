import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const OnBoardingLayout = ({ pro, client }: { pro: ReactNode, client: ReactNode }) => {
  redirect("/");
  return (
    <>{pro}</>
  )
}

export default OnBoardingLayout