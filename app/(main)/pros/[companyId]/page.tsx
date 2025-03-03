import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { CompanyDetails } from "./_components/CompanyDetails";
import { getCompanyById } from "@/src/actions/organization.action";

interface CompanyDetailsPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  redirect("/");
  const { companyId } = await params;

  if (!companyId) {
    notFound();
  }

  const company = await getCompanyById({ companyId });

  return (
    <div className="relative h-screen w-screen bg-background overflow-auto">
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="fixed -left-20 -top-20 w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl"></div>

        <div className="fixed -right-20 -bottom-20 w-[30vw] h-[30vw] rounded-full bg-gradient-to-tl from-secondary/20 via-secondary/5 to-transparent blur-3xl"></div>

        <div className="fixed left-1/4 top-1/3 w-[50vw] h-[30vh] bg-gradient-to-r from-accent/10 to-primary/5 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] rotate-12 opacity-40 blur-2xl"></div>

        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02] bg-repeat"></div>

        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <div className="relative">
              <div className="relative flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute w-12 h-12 border-4 border-secondary/20 border-b-secondary rounded-full animate-spin-slow"></div>
              </div>

              <div className="mt-6 text-foreground/70 font-medium text-center">
                <p className="text-lg">Préparation de votre expérience</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Nous récupérons les informations...
                </p>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 -z-10 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        }
      >
        <div className="w-full">
          <CompanyDetails data={company} />
        </div>
      </Suspense>
    </div>
  );
}
