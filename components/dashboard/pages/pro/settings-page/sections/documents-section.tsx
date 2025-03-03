import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentsSectionClient from "./components/documents/documents-section-client";
import { getCompanyDocuments } from "@/src/actions/companyDocuments.action";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const DocumentsSection = () => {
  const { data: documents, isLoading } = useQuery({
    queryKey: ["company-documents"],
    queryFn: () => getCompanyDocuments({}),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          Gérez vos documents professionnels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <Skeleton className="h-[500px] w-full" />
        ) : (
          <DocumentsSectionClient documents={documents?.data || []} />
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
