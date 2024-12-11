import { redirect } from "next/navigation"

const OrganizationListPage = () => {
  redirect('/');
  return (
    <>
      <h1>Companies List Page with big search bar</h1>
    </>
  )
}

export default OrganizationListPage