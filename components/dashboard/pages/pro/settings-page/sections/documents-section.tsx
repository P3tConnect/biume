import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyDocuments } from "@/src/actions/companyDocuments.action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentsSectionClient from "./components/documents/documents-section-client";

const DocumentsSection = async () => {
  const documents = await getCompanyDocuments({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          Gérez vos documents professionnels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <DocumentsSectionClient documents={documents} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
