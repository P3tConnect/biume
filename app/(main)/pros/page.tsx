import { HeroSection } from "./_components/hero-section";
import { SearchResults } from "./_components/search-results";
import { getAllOrganizations } from "@/src/actions/organization.action";
import { parseSearchParams } from "@/src/nuqs-queries/search-queries";
import { ProHeader } from "./_components/pro-header";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CompaniesListPage({ searchParams }: PageProps) {
  const searchParamsPromise = await searchParams;
  const params = parseSearchParams(searchParamsPromise);

  const data = await getAllOrganizations({
    search: params.search,
    location: params.location,
    categories: params.categories,
    availableToday: params.availableToday,
    instantBooking: params.instantBooking,
    sortBy: params.sortBy,
    page: parseInt(params.page),
  });

  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      <ProHeader />
      <div className="flex-1 overflow-auto">
        <HeroSection />
        <SearchResults organizations={data.data!} />
      </div>
    </div>
  );
}
