import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { CompanyDetails } from "./components/CompanyDetails";
import { getCompanyById } from "@/src/actions/organization.action";
import { Loader2 } from "lucide-react";

interface CompanyDetailsPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default function CompanyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  const { companyId } = use(params);

  if (!companyId) {
    notFound();
  }

  const company = getCompanyById({ companyId });

  return (
    <Suspense
      fallback={
        <div>
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <CompanyDetails data={company} />
    </Suspense>
  );
}
