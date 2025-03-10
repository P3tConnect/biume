import { useQuery } from "@tanstack/react-query"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCompanyDocuments } from "@/src/actions/companyDocuments.action"

import DocumentsSectionClient from "./components/documents/documents-section-client"

const DocumentsSection = () => {
  const { data: documents, isLoading } = useQuery({
    queryKey: ["organization-documents"],
    queryFn: () => getCompanyDocuments({}),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>Gérez vos documents professionnels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <Skeleton className="h-[500px] w-full" />
        ) : (
          <DocumentsSectionClient documents={documents?.data || []} />
        )}
      </CardContent>
    </Card>
  )
}

export default DocumentsSection
